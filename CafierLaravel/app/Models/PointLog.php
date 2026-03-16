<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class PointLog extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'point_logs';

    protected $fillable = [
        'user_id', 'transaction_id', 'type', 'amount', 'description'
    ];

    protected $casts = [
        'amount' => 'integer',
    ];
}