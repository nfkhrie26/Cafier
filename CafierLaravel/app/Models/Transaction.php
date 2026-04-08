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
        'payment_type', 
        'status', 
        'items', 
        'payment_info'
    ];
    
    protected $casts = [
        'total_amount' => 'float',
        'items' => 'array', 
        'payment_info' => 'array',
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}