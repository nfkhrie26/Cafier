<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController as ApiAuth;
use App\Http\Controllers\Api\CheckoutController as Checkout;    
use App\Http\Controllers\Api\WebhookController as Webhook;  

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [ApiAuth::class, 'register']);
Route::post('/login', [ApiAuth::class, 'login']);
Route::post('/webhook/midtrans', [Checkout::class, 'webhook']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [ApiAuth::class, 'logout']);
    Route::post('/checkout', [Checkout::class,'process']);
    Route::get('/checkout/status/{invoiceNumber}', [Checkout::class, 'checkStatus']);
});