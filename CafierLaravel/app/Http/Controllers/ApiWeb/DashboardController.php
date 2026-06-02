<?php
namespace App\Http\Controllers\ApiWeb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // 1. NGITUNG DATA KARTU ATAS
        // 🚨 Nanti lu buka comment ini dan sesuaikan sama nama Model DB lu
        $totalMenu = Product::count();
        $totalKaryawan = User::where('role', 'barista')->count();
        $totalMembership = User::where('role', 'customer')->count(); // Anggap customer itu member

        // Data dummy sementara sebelum DB lu nyambung
        $totalMenu = 20;
        $totalKaryawan = 15;
        $totalMembership = 50;

        // Nanti di sini lu pake Eloquent GroupBy/Sum buat narik data asli
        $chartData = [
            'harian' => [
                'labels' => ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                'pemasukan' => [800000, 950000, 600000, 1200000, 700000, 850000, 900000],
                'pengeluaran' => [300000, 400000, 250000, 700000, 350000, 400000, 300000],
                'total' => 'Rp1.200.000'
            ],
            'mingguan' => [
                'labels' => ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
                'pemasukan' => [4500000, 5200000, 3800000, 6100000],
                'pengeluaran' => [1800000, 2100000, 1500000, 2400000],
                'total' => 'Rp8.400.000'
            ],
            'bulanan' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
                'pemasukan' => [15000000, 18000000, 16000000, 21000000, 19000000, 22000000, 24000000, 23000000, 25000000, 28000000, 26000000, 32000000],
                'pengeluaran' => [6000000, 7000000, 6500000, 8000000, 7500000, 9000000, 9500000, 8500000, 10000000, 11000000, 10500000, 14000000],
                'total' => 'Rp45.000.000'
            ]
        ];

        // 🚨 TAMBAHAN: Kalau yang minta data itu API / Mobile, kirim JSON kayak awal
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => [
                    'stats' => [
                        'menu' => $totalMenu,
                        'karyawan' => $totalKaryawan,
                        'membership' => $totalMembership
                    ],
                    'chart_data' => $chartData
                ]
            ]);
        }

        // 🚨 TAMBAHAN: Kalau yang buka itu browser Web, tampilin file Blade-nya!
        return view('dashboard', compact('totalMenu', 'totalKaryawan', 'totalMembership', 'chartData'));
    }
}