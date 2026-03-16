<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'products';

    protected $fillable = [
        'category_id', 
        'name', 
        'description', 
        'price', 
        'is_available', 
        'image'
    ];

    protected $casts = [
        'price' => 'float', // Biar urusan duit presisi
        'is_available' => 'boolean',
    ];
    
    // Contoh relasi Reference di MongoDB
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}