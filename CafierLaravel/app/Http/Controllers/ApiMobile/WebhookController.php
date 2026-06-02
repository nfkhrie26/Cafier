<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;

class WebhookController extends Controller
{
    public function midtransHandler(Request $request)
    {
        // 1. Tangkep semua data yang dikirim Midtrans
        $payload = $request->all();

        // 2. SKEPTIS ALERT: Validasi Signature Key!
        // Ini rumus rahasia dari Midtrans: SHA512(order_id + status_code + gross_amount + ServerKey)
        $orderId = $payload['order_id'];
        $statusCode = $payload['status_code'];
        $grossAmount = $payload['gross_amount'];
        $serverKey = 'SB-Mid-server-xxxxxxxxx'; // MASUKIN SERVER KEY LU DI SINI
        
        $inputSignature = $payload['signature_key'];
        $mySignature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        if ($mySignature !== $inputSignature) {
            // Kalo gak cocok, tendang! Berarti ini hacker.
            return response()->json(['message' => 'Ngapain lu bang? Invalid signature.'], 403);
        }

        // 3. Cari transaksi di MongoDB berdasarkan order_id (invoice_number)
        $transaction = Transaction::where('invoice_number', $orderId)->first();

        if (!$transaction) {
            return response()->json(['message' => 'Transaksi gak ketemu'], 404);
        }

        // 4. Update status berdasarkan laporan Midtrans
        $transactionStatus = $payload['transaction_status'];

        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            $transaction->update(['status' => 'lunas']); // Duit udah masuk!
            // Di sini lu bisa nambah logic ngurangin stok kopi atau ngasih poin ke user
        } else if ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            $transaction->update(['status' => 'batal']);
        } else if ($transactionStatus == 'pending') {
            $transaction->update(['status' => 'pending']);
        }

        // 5. Wajib balikin status 200 OK biar Midtrans tau pesannya udah kita terima
        return response()->json(['message' => 'Webhook sukses diproses']);
    }
}