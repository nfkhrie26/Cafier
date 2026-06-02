<?php
namespace App\Http\Controllers\ApiWeb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
// use App\Models\Transaction; // Nanti sesuaikan sama nama model DB lu
// use App\Models\Expense;     // Nanti sesuaikan sama nama model DB lu

class PemasukanController extends Controller
{
    public function index()
    {
        // 1. Tarik Data Top Penjualan (Contoh: Diurutin dari field 'total_sold')
        // Pastiin lu punya field 'total_sold' di tabel products lu
        $topProducts = Product::orderBy('total_sold', 'desc')->take(10)->get();

        // 2. Tarik Data Pemasukan
        $transactions = \App\Models\Transaction::with('customer')->orderBy('created_at', 'desc')->get();
        $pemasukans = $transactions->map(function($trx) {
            return [
                'nama' => $trx->customer ? $trx->customer->name : '-',
                'tanggal' => $trx->created_at ? $trx->created_at->format('d-m-Y') : '-',
                'waktu' => $trx->created_at ? $trx->created_at->format('H:i') : '-',
                'metode' => $trx->payment_info['method'] ?? 'Cash',
                'nominal' => 'Rp ' . number_format($trx->total_amount, 0, ',', '.'),
                'status' => $trx->status ?? 'Berhasil'
            ];
        });

        // 3. Tarik Data Pengeluaran
        // $pengeluarans = Expense::orderBy('created_at', 'desc')->get();
        $pengeluarans = [
            ['nama' => 'Kopi Arabica', 'tanggal' => '12-09-2026', 'waktu' => '10:10', 'metode' => 'Qris', 'nominal' => 'Rp 5.000.000', 'kategori' => 'Operasional'],
            ['nama' => 'Gaji Barista', 'tanggal' => '30-08-2026', 'waktu' => '10:15', 'metode' => 'Transfer', 'nominal' => 'Rp 12.500.000', 'kategori' => 'Operasional'],
        ];

        // Rangkum 3 data ini jadi satu paket JSON
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
}