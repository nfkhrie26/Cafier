<?php
namespace App\Http\Controllers\ApiWeb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. NGITUNG DATA KARTU ATAS
        $totalMenu = Product::count();
        $totalMembership = User::where('role', 'customer')->count(); // Anggap customer itu member

        // Menghitung chart data (Dummy fallback dengan total dinamis jika belum ada transaksi)
        $totalPemasukanDb = \App\Models\Transaction::sum('total_amount') ?? 0;
        
        $chartData = [
            'harian' => [
                'labels' => ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                'pemasukan' => [800000, 950000, 600000, 1200000, 700000, 850000, 900000],
                'pengeluaran' => [300000, 400000, 250000, 700000, 350000, 400000, 300000],
                'total' => 'Rp ' . number_format($totalPemasukanDb ?: 1200000, 0, ',', '.')
            ],
            'mingguan' => [
                'labels' => ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
                'pemasukan' => [4500000, 5200000, 3800000, 6100000],
                'pengeluaran' => [1800000, 2100000, 1500000, 2400000],
                'total' => 'Rp ' . number_format($totalPemasukanDb ?: 8400000, 0, ',', '.')
            ],
            'bulanan' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
                'pemasukan' => [15000000, 18000000, 16000000, 21000000, 19000000, 22000000, 24000000, 23000000, 25000000, 28000000, 26000000, 32000000],
                'pengeluaran' => [6000000, 7000000, 6500000, 8000000, 7500000, 9000000, 9500000, 8500000, 10000000, 11000000, 10500000, 14000000],
                'total' => 'Rp ' . number_format($totalPemasukanDb ?: 45000000, 0, ',', '.')
            ]
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'menu' => $totalMenu,
                    'membership' => $totalMembership
                ],
                'chart_data' => $chartData
            ]
        ]);
    }
}