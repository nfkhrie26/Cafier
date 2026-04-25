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
        'stock',       
        'image'
    ];

    protected $casts = [
        'price' => 'float', 
        'is_available' => 'boolean',
        'stock' => 'integer',
    ];
    
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}