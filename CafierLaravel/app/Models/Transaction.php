<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Transaction extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'transactions';

    protected $fillable = [
        'invoice_number', 
        'customer_id', 
        'barista_id', 
        'total_amount',
        'status', 
        'items', 
        'payment_info'
    ];
    
    protected $casts = [
        'total_amount' => 'float',
        'items' => 'array', 
        'payment_info' => 'array',
    ];

    // 🚨 KOREKSI: Tambahin ini biar with('user') di Controller Barista bisa jalan
    public function user()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    // Ini tetep dibiarin aja ya, jaga-jaga kalau di file lain ada yang manggil customer()
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}