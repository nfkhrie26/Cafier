<?php
namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class PointRule extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'point_rules';

    protected $fillable = ['key', 'value', 'description'];

    protected $casts = [
        'value' => 'integer',
    ];
}