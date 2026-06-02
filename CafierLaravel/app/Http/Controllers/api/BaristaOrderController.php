<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class BaristaOrderController extends Controller
{
    public function orderShow()
    {
        // 🚨 KOREKSI: Tambahin with('user') biar nama pelanggannya ikut ditarik dari database!
        $pesanan = Transaction::with('user') 
            ->whereNotIn('status', ['batal', 'cancel'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Berhasil ngambil daftar pesanan',
            'data' => $pesanan
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan nggak ketemu!'
            ], 404);
        }

        $transaction->update([
            'status' => strtolower($request->status) 
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status pesanan berhasil diupdate!',
            'data' => $transaction
        ]);
    }
}