<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Transaction extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'transactions';

    protected $fillable = [
        'invoice',
        'total_price',
        'payment_method',
        'paid_amount',
        'change'
    ];
}