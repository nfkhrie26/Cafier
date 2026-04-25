<?php

namespace App\Http\Controllers\Api;

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
}