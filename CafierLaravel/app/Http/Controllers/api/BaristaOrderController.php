<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class BaristaOrderController extends Controller
{
    public function orderShow()
    {
        $pesanan = Transaction::where('status', 'diproses')->get();

        return response()->json([
            'success' => true,
            'message' => 'Berhasil ngambil daftar pesanan',
            'data' => $pesanan
        ]);
    }
}
