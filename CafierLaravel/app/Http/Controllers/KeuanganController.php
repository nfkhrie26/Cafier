<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Product; 

class KeuanganController extends Controller
{
    public function index()
    {
        // 1. Ambil SEMUA transaksi yang statusnya 'lunas'
        $transactions = DB::table('transactions')->where('status', 'lunas')->get();
        $salesData = [];

        // 2. Bongkar keranjang belanjanya
        foreach ($transactions as $trx) {
            if (isset($trx->items)) {
                $items = is_string($trx->items) ? json_decode($trx->items, true) : $trx->items;

                if (is_array($items)) {
                    foreach ($items as $item) {
                        if (isset($item['id']) && isset($item['qty'])) {
                            $pid = (string) $item['id'];
                            
                            if (!isset($salesData[$pid])) {
                                $salesData[$pid] = [
                                    'id' => $pid,
                                    'name' => $item['name'] ?? 'Produk Dihapus', 
                                    'price' => $item['price'] ?? 0,
                                    'qty' => 0
                                ];
                            }
                            $salesData[$pid]['qty'] += (int) $item['qty'];
                        }
                    }
                }
            }
        }

        // 3. Urutin dari yang paling laku
        usort($salesData, function($a, $b) {
            return $b['qty'] <=> $a['qty'];
        });

        // 4. Siapin data buat dilempar ke Blade
        $topProducts = collect();
        foreach ($salesData as $data) {
            // 🚨 JURUS CHEAT: Cari pakai ID ATAU NAMA biar pasti dapet fotonya!
            $product = Product::where('id', (int)$data['id'])
                                ->orWhere('id', (string)$data['id'])
                                ->orWhere('_id', $data['id'])
                                ->orWhere('name', 'like', '%' . $data['name'] . '%') 
                                ->first();
            
            if ($product) {
                $product->total_sold = $data['qty'];
                $topProducts->push($product);
            } else {
                $fallback = new \stdClass();
                $fallback->id = $data['id'];
                $fallback->name = $data['name'];
                $fallback->price = $data['price'];
                $fallback->total_sold = $data['qty'];
                $fallback->category_id = null; 
                $fallback->image = null; 
                
                $topProducts->push($fallback);
            }
        }

        return view('pengeluaran-pemasukan', compact('topProducts'));
    }
}