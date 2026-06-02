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

        // 2. Tarik Data Pemasukan (Tinggal buka comment kalo tabel lu udah siap)
        // $pemasukans = Transaction::where('status', 'Berhasil')->orderBy('created_at', 'desc')->get();
        $pemasukans = [
            ['nama' => 'Mamat', 'tanggal' => '12-10-2025', 'waktu' => '10:10', 'metode' => 'Qris', 'nominal' => 'RP125.000', 'status' => 'Berhasil'],
            ['nama' => 'Cila', 'tanggal' => '12-10-2025', 'waktu' => '10:15', 'metode' => 'Master Card', 'nominal' => 'RP125.000', 'status' => 'Berhasil'],
            ['nama' => 'Adawong', 'tanggal' => '12-10-2025', 'waktu' => '10:20', 'metode' => 'Qris', 'nominal' => 'RP125.000', 'status' => 'Berhasil'],
        ];

        // 3. Tarik Data Pengeluaran
        // $pengeluarans = Expense::orderBy('created_at', 'desc')->get();
        $pengeluarans = [
            ['nama' => 'Kopi Arabica', 'tanggal' => '12-9-2025', 'waktu' => '10:10', 'metode' => 'Qris', 'nominal' => 'RP5.000.000', 'kategori' => 'Oprasional'],
            ['nama' => 'Gaji Barista', 'tanggal' => '30-8-2025', 'waktu' => '10:15', 'metode' => 'Transfer', 'nominal' => 'RP12.500.000', 'kategori' => 'Oprasional'],
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