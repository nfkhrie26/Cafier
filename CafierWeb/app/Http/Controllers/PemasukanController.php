<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PemasukanController extends Controller
{
    public function index()
    {
        $response = Http::withToken(session('api_token'))
                        ->acceptJson()
                        ->get(env('CAFIER_API_URL') . '/web/finances');

        $apiData = $response->successful() ? $response->json('data') : [];

        // Pecah datanya (Pake array kosong [] sebagai nilai default kalo API error)
        $topProducts = $apiData['top_products'] ?? [];
        $pemasukans = $apiData['pemasukans'] ?? [];
        $pengeluarans = $apiData['pengeluarans'] ?? [];

        return view('pengeluaran-pemasukan', compact('topProducts', 'pemasukans', 'pengeluarans'));
    }
}