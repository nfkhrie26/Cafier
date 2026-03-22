<?php
namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumToken;
use MongoDB\Laravel\Eloquent\DocumentModel; // Pake package resmi MongoDB

class PersonalAccessToken extends SanctumToken
{
    // Ini sihirnya! Kita tempelin sifat-sifat MongoDB ke dalem model Sanctum
    use DocumentModel; 

    // Kasih tau arah jalannya
    protected $connection = 'mongodb';
    protected $collection = 'personal_access_tokens';
    
    // Nyesuaiin tipe ID dari Integer (SQL) jadi String (Object ID MongoDB)
    protected $primaryKey = '_id';
    protected $keyType = 'string';
}