<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PemasukanController extends Controller
{
    public function index(Request $request)
    {
        $queryParams = [];
        if ($request->has('month')) $queryParams['month'] = $request->month;
        if ($request->has('year')) $queryParams['year'] = $request->year;

        $response = Http::withToken(session('api_token'))
                        ->acceptJson()
                        ->get(env('CAFIER_API_URL') . '/web/finances', $queryParams);

        $apiData = $response->successful() ? $response->json('data') : [];

        // Pecah datanya
        $topProducts = $apiData['top_products'] ?? [];
        $pemasukans = $apiData['pemasukans'] ?? [];
        $pengeluarans = $apiData['pengeluarans'] ?? [];

        return view('pengeluaran-pemasukan', compact('topProducts', 'pemasukans', 'pengeluarans', 'request'));
    }

    public function storeExpense(Request $request)
    {
        $response = Http::withToken(session('api_token'))
                        ->acceptJson()
                        ->post(env('CAFIER_API_URL') . '/web/finances/expenses', [
                            'nama' => $request->nama,
                            'nominal' => $request->nominal,
                            'metode' => $request->metode
                        ]);

        if ($response->successful()) {
            return redirect()->back()->with('success', 'Pengeluaran berhasil ditambah!');
        }

        $errorMessage = $response->json('message') ?? 'Gagal mencatat pengeluaran bro! Cek koneksi API.';
        return redirect()->back()->withErrors(['error' => $errorMessage])->withInput();
    }
}