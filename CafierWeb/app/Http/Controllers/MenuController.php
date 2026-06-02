<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MenuController extends Controller
{
    public function index()
    {
        $response = Http::withToken(session('api_token'))
                        ->acceptJson() // 🚨 MANTRA WAJIB
                        ->get(env('CAFIER_API_URL') . '/web/menus');

        $apiData = $response->json('data');
        $menus = $apiData ?? [];
        return view('daftar-menu', compact('menus'));
    }

    public function store(Request $request)
    {
        $response = Http::withToken(session('api_token'))
                        ->acceptJson() // 🚨 MANTRA WAJIB
                        ->post(env('CAFIER_API_URL') . '/web/menus', [
                            'name' => $request->name,
                            'price' => $request->price,
                            'description' => $request->description,
                            'category_id' => $request->category_id,
                        ]);

        if ($response->successful()) {
            return redirect()->back()->with('success', 'Menu berhasil ditambah!');
        }

        // 🚨 TANGKEP ERROR ASLI DARI API BIAR GA BUTA
        // Kalo API ngirim 'message', pake itu. Kalo ngga, pake pesan default.
        $errorMessage = $response->json('message') ?? 'Gagal nambah menu bro! Cek koneksi API.';
        
        // 🚨 Tambahin withInput() biar isian form user ga ilang pas gagal
        return redirect()->back()->withErrors(['error' => $errorMessage])->withInput();
    }

    public function update(Request $request, $id)
    {
        $response = Http::withToken(session('api_token'))
                        ->acceptJson() // 🚨 MANTRA WAJIB
                        ->put(env('CAFIER_API_URL') . '/web/menus/' . $id, [
                            'name' => $request->name,
                            'price' => $request->price,
                            'description' => $request->description,
                            'category_id' => $request->category_id,
                        ]);

        if ($response->successful()) {
            return redirect()->back()->with('success', 'Menu berhasil diubah!');
        }

        // 🚨 TANGKEP ERROR ASLI DARI API
        $errorMessage = $response->json('message') ?? 'Gagal ngubah menu bro! Cek koneksi API.';
        
        return redirect()->back()->withErrors(['error' => $errorMessage])->withInput();
    }

    public function destroy($id)
    {
        $response = Http::withToken(session('api_token'))
                        ->acceptJson() // 🚨 Mantra Wajib
                        ->delete(env('CAFIER_API_URL') . '/web/menus/' . $id);

        if ($response->successful()) {
            return redirect()->back()->with('success', 'Menu berhasil dihapus bro!');
        }

        $errorMessage = $response->json('message') ?? 'Gagal hapus menu! Cek koneksi API.';
        return redirect()->back()->withErrors(['error' => $errorMessage]);
    }
}