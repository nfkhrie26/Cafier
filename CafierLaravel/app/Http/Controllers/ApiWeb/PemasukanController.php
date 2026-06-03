<?php
namespace App\Http\Controllers\ApiWeb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
// use App\Models\Transaction; // Nanti sesuaikan sama nama model DB lu
// use App\Models\Expense;     // Nanti sesuaikan sama nama model DB lu

class PemasukanController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');

        // 1. Tarik Data Top Penjualan (Dihitung dari transaksi)
        $queryTop = \App\Models\Transaction::whereIn('status', ['pending', 'processed', 'pickup', 'completed'])->get();
        
        if ($month && $year) {
            $queryTop = $queryTop->filter(function($trx) use ($month, $year) {
                if (!$trx->created_at) return false;
                
                try {
                    // created_at bisa berupa string ISO dari MongoDB
                    $date = \Carbon\Carbon::parse($trx->created_at);
                    return $date->format('m') == sprintf('%02d', $month) && $date->format('Y') == $year;
                } catch (\Exception $e) {
                    return false;
                }
            });
        }
        
        $transactionsTop = $queryTop;
        $productSales = [];
        foreach ($transactionsTop as $trx) {
            if (!empty($trx->items)) {
                foreach ($trx->items as $item) {
                    // Gunakan key yang benar dari JSON (id dan qty)
                    $pid = is_array($item) ? ($item['id'] ?? null) : ($item->id ?? null);
                    $qty = is_array($item) ? ($item['qty'] ?? 0) : ($item->qty ?? 0);
                    
                    if ($pid) {
                        if (!isset($productSales[$pid])) $productSales[$pid] = 0;
                        $productSales[$pid] += $qty;
                    }
                }
            }
        }

        $topProducts = [];
        if (!empty($productSales)) {
            arsort($productSales);
            $topProductIds = array_slice(array_keys($productSales), 0, 10);
            $products = Product::whereIn('_id', $topProductIds)->get()->keyBy('_id');
            foreach ($productSales as $pid => $qty) {
                if (isset($products[$pid])) {
                    $p = $products[$pid]->toArray();
                    $p['total_sold'] = $qty;
                    $topProducts[] = $p;
                }
            }
            $topProducts = array_slice($topProducts, 0, 10);
        }

        // 2. Tarik Data Pemasukan
        $transactions = \App\Models\Transaction::with('customer')
            ->whereIn('status', ['pending', 'completed']) // Sesuai request: bayaran doang
            ->orderBy('created_at', 'desc')->get();
            
        $pemasukans = $transactions->map(function($trx) {
            return [
                'nama' => $trx->customer ? $trx->customer->name : '-',
                'tanggal' => $trx->created_at ? $trx->created_at->format('d-m-Y') : '-',
                'waktu' => $trx->created_at ? $trx->created_at->format('H:i') : '-',
                'metode' => 'QRIS', // Sesuai request: harusnya qris
                'nominal' => 'Rp ' . number_format($trx->total_amount, 0, ',', '.'),
                'status' => ucfirst($trx->status)
            ];
        });

        // 3. Tarik Data Pengeluaran
        $pengeluarans = \App\Models\Expense::orderBy('created_at', 'desc')->get()->map(function($exp) {
            return [
                'nama' => $exp->nama,
                'tanggal' => $exp->tanggal,
                'waktu' => $exp->waktu,
                'metode' => $exp->metode,
                'nominal' => 'Rp ' . number_format($exp->nominal, 0, ',', '.')
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Berhasil narik data keuangan',
            'data' => [
                'top_products' => $topProducts,
                'pemasukans' => $pemasukans,
                'pengeluarans' => $pengeluarans
            ]
        ], 200);
    }
    
    public function storeExpense(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'nominal' => 'required|numeric',
            'metode' => 'required|string'
        ]);
        
        $now = \Carbon\Carbon::now('Asia/Jakarta');

        \App\Models\Expense::create([
            'nama' => $request->nama,
            'nominal' => $request->nominal,
            'metode' => $request->metode,
            'tanggal' => $now->format('d-m-Y'),
            'waktu' => $now->format('H:i')
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Pengeluaran berhasil dicatat!'
        ], 201);
    }
}