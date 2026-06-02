<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Ambil semua transaksi yang udah dibayar
        $transactions = Transaction::whereIn('status', ['completed', 'lunas', 'paid'])->get();

        // 2. Siapin keranjang buat nampung data grafik
        $harian = [
            'labels' => ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
            'pemasukan' => [0, 0, 0, 0, 0, 0, 0],
            'pengeluaran' => [0, 0, 0, 0, 0, 0, 0], // Pengeluaran 0 karena dari sistem cuma ada transaksi masuk
            'total' => 0
        ];

        $mingguan = [
            'labels' => ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'],
            'pemasukan' => [0, 0, 0, 0, 0],
            'pengeluaran' => [0, 0, 0, 0, 0],
            'total' => 0
        ];

        $bulanan = [
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
            'pemasukan' => array_fill(0, 12, 0),
            'pengeluaran' => array_fill(0, 12, 0),
            'total' => 0
        ];

        // 3. Olah datanya sesuai tanggal!
        foreach ($transactions as $trx) {
            $date = Carbon::parse($trx->created_at);
            $amount = (float) ($trx->total_amount ?? $trx->total ?? 0);

            // Hitung pemasukan Harian (Senin-Minggu minggu ini)
            if ($date->isCurrentWeek()) {
                $dayIndex = $date->dayOfWeekIso - 1; 
                $harian['pemasukan'][$dayIndex] += $amount;
                $harian['total'] += $amount;
            }

            // Hitung pemasukan Mingguan (Minggu 1-5 bulan ini)
            if ($date->isCurrentMonth()) {
                $weekIndex = $date->weekOfMonth - 1;
                if(isset($mingguan['pemasukan'][$weekIndex])) {
                    $mingguan['pemasukan'][$weekIndex] += $amount;
                    $mingguan['total'] += $amount;
                }
            }

            // Hitung pemasukan Bulanan (Jan-Des tahun ini)
            if ($date->isCurrentYear()) {
                $monthIndex = $date->month - 1;
                $bulanan['pemasukan'][$monthIndex] += $amount;
                $bulanan['total'] += $amount;
            }
        }

        // 4. Format angka jadi Rupiah yang cantik
        $harian['total'] = 'Rp ' . number_format($harian['total'], 0, ',', '.');
        $mingguan['total'] = 'Rp ' . number_format($mingguan['total'], 0, ',', '.');
        $bulanan['total'] = 'Rp ' . number_format($bulanan['total'], 0, ',', '.');

        // 5. Kirim data ke tampilan (Frontend)
        $chartData = [
            'harian' => $harian,
            'mingguan' => $mingguan,
            'bulanan' => $bulanan
        ];

        return view('dashboard', compact('chartData'));
    }
}