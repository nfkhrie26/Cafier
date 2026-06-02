<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();

        return response()->json([
            'success' => true,
            'message' => 'Berhasil ngambil daftar menu Cafier',
            'data' => $products
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Menu nggak ketemu!'
            ], 404);
        }

        // 🚨 UPDATE DISINI: Sekarang pakai is_available sesuai database kamu
        $product->update($request->only(['is_available', 'stock']));

        return response()->json([
            'success' => true,
            'message' => 'Status menu berhasil diupdate!',
            'data' => $product
        ]);
    }
}