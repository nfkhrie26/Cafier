<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\User;
use App\Models\PointRule;
use App\Models\UserVoucher;

class WebhookController extends Controller
{
    public function midtransHandler(Request $request)
    {
        $payload = $request->all();
        $orderId = $payload['order_id'];
        $statusCode = $payload['status_code'];
        $grossAmount = $payload['gross_amount'];
        $signatureKey = $payload['signature_key'];
        $transactionStatus = $payload['transaction_status'];

        $serverKey = config('midtrans.server_key');
        $mySignature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        if ($mySignature !== $signatureKey) {
            return response()->json(['status' => 'error', 'message' => 'Invalid Signature'], 403);
        }

        $transaction = Transaction::where('invoice_number', $orderId)->first();
        if (!$transaction) {
            return response()->json(['status' => 'error', 'message' => 'Transaction not found'], 404);
        }

        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            $transaction->update(['status' => 'paid']);

            // --- EKSEKUSI LOYALTY SYSTEM CAFIER DI SINI ---
            $this->handleLoyaltyPoints($transaction);

        } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            $transaction->update(['status' => 'failed']);
        } elseif ($transactionStatus == 'pending') {
            $transaction->update(['status' => 'pending']);
        }

        // 5. Selalu balikin status 200 OK ke Midtrans biar dia gak ngirim notif berulang-ulang
        return response()->json(['status' => 'success']);
    }

    // Fungsi khusus buat ngurusin Poin & Voucher (Biar kodingan di atas tetep rapi)
    private function handleLoyaltyPoints($transaction)
    {
        $user = User::find($transaction->customer_id);
        if (!$user) return;

        // Misal: Tiap kelipatan Rp 10.000 dapet 10 poin
        $earnedPoints = floor($transaction->total_amount / 10000) * 10;
        
        // Tambahin poin ke user
        $user->increment('points', $earnedPoints);

        // Ambil "Angka Sakti" dari admin (atau default 100)
        $maxPoints = PointRule::where('key', 'voucher_threshold')->value('value') ?? 100;

        // Cek apakah poinnya sekarang nyentuh target milestone
        // Pake $user->fresh() buat ngambil data poin terbaru setelah di-increment
        $currentUser = $user->fresh(); 
        
        if ($currentUser->points >= $maxPoints) {
            // Bikin Voucher!
            UserVoucher::create([
                'user_id' => $user->id,
                'title' => 'Reward Milestone ' . $maxPoints . ' Poin!',
                'is_used' => false,
                'expired_at' => now()->addDays(14),
                'source' => 'milestone'
            ]);

            // Potong poinnya karena udah dituker voucher
            $user->decrement('points', $maxPoints);
        }
    }
}