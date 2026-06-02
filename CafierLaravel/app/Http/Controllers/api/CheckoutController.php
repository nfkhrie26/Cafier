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

        $user = $request->user(); 

        // 🚨 SIASAT FOTO: Kita ubah isi items biar dipaksa narik foto dari database Produk
        $formattedItems = [];
        if (isset($request->items)) {
            foreach ($request->items as $item) {
                // Cari produk aslinya di database
                $produk = Product::find($item['id']);
                
                if ($produk) {
                    // 🚨 Selipin foto dan nama aslinya ke pesanan biar Barista bisa liat
                    $item['image'] = $produk->image;
                    $item['name'] = $produk->name; // Jaga-jaga biar namanya bener

                    // Kurangin stok
                    if (!is_null($produk->stock)) {
                        $produk->decrement('stock', $item['qty']);
                    }
                }
                // Masukin ke keranjang yang udah diformat rapi
                $formattedItems[] = $item;
            }
        }

        // 1. Simpen data pesanan ke MongoDB (Pake $formattedItems yang udah ada fotonya)
        $transaction = Transaction::create([
            'invoice_number' => 'TRX-' . time() . '-' . Str::random(5),
            'customer_id' => $user->id,
            'barista_id' => '666',
            'total_amount' => $request->total_amount,
            'status' => 'pending',
            'items' => $formattedItems, // 🚨 Disimpen lengkap sama fotonya
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
            return response()->json([
                'status' => 'error', 
                'message' => 'Gagal dapet token: ' . $e->getMessage()
            ], 500);
        }
    }

    public function checkStatus($invoice_number)
    {
        $statusMidtrans = \Midtrans\Transaction::status($invoice_number);
        $transaction = Transaction::where('invoice_number', $invoice_number)->first();

        // 🚨 UDAH DIGANTI JADI 'processed' BIAR SINKRON SAMA IPAD BARISTA
        if ($statusMidtrans->transaction_status == 'settlement' || $statusMidtrans->transaction_status == 'capture') {
            $transaction->update(['status' => 'processed']); 
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

        // 🚨 UDAH DIGANTI JADI 'processed'
        if ($transaction->status === 'processed') {
            return response()->json(['message' => 'Udah diproses bos!']);
        }

        if ($transactionStatus == 'capture') {
            if ($paymentType == 'credit_card') {
                if ($fraudStatus == 'challenge') {
                    $transaction->update(['status' => 'pending']);
                } else {
                    $transaction->update(['status' => 'processed']); // 🚨 Diganti
                }
            }
        } 
        else if ($transactionStatus == 'settlement') {
            $transaction->update(['status' => 'processed']); // 🚨 Diganti
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
    }
}