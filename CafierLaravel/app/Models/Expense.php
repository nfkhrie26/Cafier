<?php
namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Expense extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'expenses';
    
    protected $fillable = [
        'nama',
        'nominal',
        'tanggal',
        'waktu',
        'metode'
    ];
}
