<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class UserVoucher extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'user_vouchers';

    protected $fillable = [
        'user_id', 
        'rank_id', 
        'title', 
        'benefit', 
        'is_used', 
        'expired_at'
    ];

    protected $casts = [
        'benefit' => 'array',
        'is_used' => 'boolean',
        'expired_at' => 'datetime', // Biar otomatis jadi object Carbon di Laravel
    ];
}