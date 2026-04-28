<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Services\MidtransService;
use Illuminate\Support\Str;
use App\Models\Product;

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

        if (isset($request->items)) {
            foreach ($request->items as $item) {
                $produk = Product::find($item['id']);
                if ($produk && !is_null($produk->stock)) {
                    $produk->decrement('stock', $item['qty']);
                }
            }
        }

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
    // Di CheckoutController.php
   public function checkStatus($invoice_number)
    {
        $statusMidtrans = \Midtrans\Transaction::status($invoice_number);
        $transaction = Transaction::where('invoice_number', $invoice_number)->first();

        // 🚨 UDAH DIGANTI JADI DIPROSES
        if ($statusMidtrans->transaction_status == 'settlement' || $statusMidtrans->transaction_status == 'capture') {
            $transaction->update(['status' => 'diproses']);
        }

        return response()->json([
            'status' => $transaction->status,
            'id' => $transaction->_id,
            'midtrans_raw' => $statusMidtrans
        ]);
    }

    public function webhook(Request $request)
    {
        try {
            $notif = new \Midtrans\Notification();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lu siapa jawa?'], 403);
        }

        $transactionStatus = $notif->transaction_status;
        $paymentType = $notif->payment_type;
        $invoiceNumber = $notif->order_id;
        $fraudStatus = $notif->fraud_status;

        $transaction = Transaction::where('invoice_number', $invoiceNumber)->first();

        if (!$transaction) {
            return response()->json(['message' => 'Pesanan tidak ditemukan'], 404);
        }

        if ($transaction->status === 'diproses') {
            return response()->json(['message' => 'Udah diproses bos!']);
        }

        if ($transactionStatus == 'capture') {
            if ($paymentType == 'credit_card') {
                if ($fraudStatus == 'challenge') {
                    $transaction->update(['status' => 'pending']);
                } else {
                    $transaction->update(['status' => 'diproses']);
                }
            }
        } 
        else if ($transactionStatus == 'settlement') {
            $transaction->update(['status' => 'diproses']);
        } 
        else if ($transactionStatus == 'pending') {
            $transaction->update(['status' => 'pending']);
        } 
        else if ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
            $transaction->update(['status' => 'batal']);

            if (isset($transaction->items)) {
                foreach ($transaction->items as $item) {
                    $produk = Product::find($item['id']);
                    if($produk && !is_null($produk->stock)){
                        $produk->increment('stock', $item['qty']);
                    }
                }
            }
        }

        return response()->json(['message' => 'Laporan Webhook Sukses Diproses']);
    }}