<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class MidtransLog extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'midtrans_logs';

    protected $fillable = [
        'order_id', 'transaction_status', 'raw_response'
    ];

    protected $casts = [
        'raw_response' => 'array', // Simpen JSON asli dari Midtrans di sini
    ];
}