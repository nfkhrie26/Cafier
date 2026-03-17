<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Services\MidtransService;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    protected $midtransService;

    // Dependency Injection: Cara OOP masukin Service ke Controller
    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    public function process(Request $request)
    {
        $request->validate([
            'total_amount' => 'required|numeric',
            'items' => 'required|array'
        ]);

        $user = $request->user(); // Dapet dari token Sanctum

        // 1. Simpen data pesanan ke MongoDB (Status masih 'pending')
        $transaction = Transaction::create([
            'invoice_number' => 'TRX-' . time() . '-' . Str::random(5),
            'customer_id' => $user->id,
            'barista_id' => '666',
            'total_amount' => $request->total_amount,
            'status' => 'pending',
            'items' => $request->items, // Array ini otomatis disimpen rapi di MongoDB
        ]);

        try {
            // 2. Suruh Service ngambil Snap Token
            $snapToken = $this->midtransService->createSnapToken($transaction, $user);

            // 3. Balikin ke React Native
            return response()->json([
                'status' => 'success',
                'invoice_number' => $transaction->invoice_number,
                'snap_token' => $snapToken
            ]);
        } catch (\Exception $e) {
            // Biar lu tau persis Midtrans ngambek gara-gara apa
            return response()->json([
                'status' => 'error', 
                'message' => 'Gagal dapet token: ' . $e->getMessage()
            ], 500);
        }
    }
}