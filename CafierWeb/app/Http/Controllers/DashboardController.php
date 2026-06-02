<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Cek apakah user punya token di session (Udah login belum?)
        if (!session()->has('api_token')) {
            return redirect()->route('login')->withErrors(['username' => 'Lu harus login dulu bro!']);
        }

        try {
            // 2. Nembak CafierAPI pake Token
            $response = Http::withToken(session('api_token'))
                            ->get(env('CAFIER_API_URL') . '/web/dashboard');

            if ($response->successful()) {
                // 3. Kalo sukses, ambil datanya dan lempar ke view Blade
                $apiData = $response->json('data');
                
                return view('dashboard', [
                    'stats' => $apiData['stats'],
                    'chartData' => $apiData['chart_data']
                ]);
            }

            // Kalo token expired / API nolak
            session()->forget(['api_token', 'user_data']);
            return redirect()->route('login')->withErrors(['username' => 'Sesi login abis, login lagi ya.']);

        } catch (\Exception $e) {
            // Kalo CafierAPI lagi down
            return "Waduh, server API Cafier mati! Nyalain dulu bro.";
        }
    }
}