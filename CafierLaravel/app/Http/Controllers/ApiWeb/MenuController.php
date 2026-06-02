<?php

namespace App\Http\Controllers\ApiWeb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product; // Pastiin nama model lu bener!

class MenuController extends Controller
{
    public function index()
    {
        $menus = Product::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Berhasil narik data menu',
            'data' => $menus
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'category_id' => 'required'
        ]);

        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Menu baru berhasil ditambah!'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil diubah!'
        ], 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil dihapus!'
        ], 200);
    }
}