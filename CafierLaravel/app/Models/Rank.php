<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Rank extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'ranks';

    protected $fillable = ['name', 'min_points', 'benefits'];

    protected $casts = [
        'min_points' => 'integer',
        'benefits' => 'array', // Misal mau nyimpen aturan diskonnya dapet apa aja
    ];
}