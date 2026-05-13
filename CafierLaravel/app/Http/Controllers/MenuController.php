<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product; // Memakai model Product yang sama dengan Mobile

class MenuController extends Controller
{
    // 1. Tampilkan halaman daftar menu
    public function index()
    {
        // Ambil data terbaru dari database
        $menus = Product::all(); 
        
        // Pastikan nama view ini 'daftar-menu' sesuai nama file blade kamu
        return view('daftar-menu', compact('menus')); 
    }

    // 2. Simpan menu baru (Tambah)
    public function store(Request $request)
    {
        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id,
            // 'image' => 'logo.png' // Sementara default dulu sebelum ada fitur upload
        ]);

        return redirect()->back()->with('success', 'Menu baru berhasil ditambah!');
    }

    // 3. Update menu lama (Ubah)
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        return redirect()->back()->with('success', 'Menu berhasil diubah!');
    }
}