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
            // 1. Panggil SDK Midtrans
            $statusMidtrans = \Midtrans\Transaction::status($invoice_number);

            // 2. Cari transaksi di MongoDB
            $transaction = Transaction::where('invoice_number', $invoice_number)->first();

            // 3. Logic update (Sama kayak logic di Webhook lu)
            if ($statusMidtrans->transaction_status == 'settlement' || $statusMidtrans->transaction_status == 'capture') {
                $transaction->update(['status' => 'lunas']);
            }

            return response()->json([
                'status' => $transaction->status,
                'midtrans_raw' => $statusMidtrans
            ]);
        }
    public function webhook(Request $request)
    {
        try {
            $notif = new \Midtrans\Notification();
        } catch (\Exception $e) {
            // Kalau gagal, catet di log dan tendang!
            return response()->json(['message' => 'Lu siapa jawa?'], 403);
        }

        // 3. AMBIL DATA PENTING
        $transactionStatus = $notif->transaction_status;
        $paymentType = $notif->payment_type;
        $invoiceNumber = $notif->order_id;
        $fraudStatus = $notif->fraud_status;

        // 4. CARI DATA DI MONGODB
        $transaction = Transaction::where('invoice_number', $invoiceNumber)->first();

        // Kalo datanya gaib (gak ada di database)
        if (!$transaction) {
            return response()->json(['message' => 'Pesanan tidak ditemukan'], 404);
        }

        if ($transaction->status === 'lunas') {
            return response()->json(['message' => 'Udah lunas!']);
        }

        // 5. LOGIC PERUBAHAN STATUS
        if ($transactionStatus == 'capture') {
            // Khusus Kartu Kredit
            if ($paymentType == 'credit_card') {
                if ($fraudStatus == 'challenge') {
                    $transaction->update(['status' => 'pending']);
                } else {
                    $transaction->update(['status' => 'lunas']);
                }
            }
        } 
        else if ($transactionStatus == 'settlement') {
            // Ini lunas buat QRIS, VA, GoPay, dll
            $transaction->update(['status' => 'lunas']);
        } 
        else if ($transactionStatus == 'pending') {
            $transaction->update(['status' => 'pending']);
        } 
        else if ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
            // Kalau gagal/kadaluarsa, status jadi batal
            $transaction->update(['status' => 'batal']);

            // Kalo user gak jadi bayar, stok yang udah di-booking harus dibalikin
            // if (isset($transaction->items)) {
            //     foreach ($transaction->items as $item) {
            //         // Asumsi struktur MongoDB lu punya field 'product_id' dan 'qty'
            //         Product::where('_id', $item['id'])->increment('stock', $item['qty']);
            //     }
            // }
        }

        // 6. KASIH OK KE MIDTRANS
        return response()->json(['message' => 'Laporan Webhook Sukses Diproses']);
    }
}