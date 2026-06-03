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
        $http = Http::withToken(session('api_token'))->acceptJson();
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $http = $http->attach('image', file_get_contents($image), $image->getClientOriginalName());
        }

        $response = $http->post(env('CAFIER_API_URL') . '/web/menus', [
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        if ($response->successful()) {
            return redirect()->back()->with('success', 'Menu berhasil ditambah!');
        }

        $errorMessage = $response->json('message') ?? 'Gagal nambah menu bro! Cek koneksi API.';
        return redirect()->back()->withErrors(['error' => $errorMessage])->withInput();
    }

    public function update(Request $request, $id)
    {
        $http = Http::withToken(session('api_token'))->acceptJson();
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $http = $http->attach('image', file_get_contents($image), $image->getClientOriginalName());
        }

        // 🚨 Karena HTTP PUT multipart sering bermasalah di PHP, lebih aman pakai method spoofing via POST + _method=PUT
        $response = $http->post(env('CAFIER_API_URL') . '/web/menus/' . $id, [
            '_method' => 'PUT',
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