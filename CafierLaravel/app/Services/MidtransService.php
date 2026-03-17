<?php 
namespace App\Services;

use Exception;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\Transaction;

class MidtransService
{
    public function __construct()
    {
        // Setup konfigurasi Midtrans pas class ini dipanggil
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
        Config::$curlOptions = [
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTPHEADER => []
        ];
    }

    public function createSnapToken(Transaction $transaction, $customer)
    {
        // Susun payload sesuai format yang diminta Midtrans
        $params = [
            'transaction_details' => [
                'order_id' => $transaction->invoice_number,
                'gross_amount' => (int) $transaction->total_amount, 
            ],
            'customer_details' => [
                'first_name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
            ],

            'callbacks' => [
            'finish' => 'https://cafier-app.com/payment-finish'
        ]
            // Data items (keranjang) dari MongoDB lu bisa di-passing ke sini kalo mau
        ];

        try {
            // Minta token Snap ke server Midtrans
            return Snap::getSnapToken($params);
        } catch (Exception $e) {
            throw new Exception("Gagal dapet token Midtrans: " . $e->getMessage());
        }
    }
}