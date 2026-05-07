<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController as ApiAuth;
use App\Http\Controllers\Api\CheckoutController as Checkout;    
use App\Http\Controllers\Api\CategoryController;  
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\OrderController; 

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [ApiAuth::class, 'register']);
Route::post('/login', [ApiAuth::class, 'login']);
Route::post('/webhook/midtrans', [Checkout::class, 'webhook']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [ApiAuth::class, 'logout']);
    Route::put('/profile', [ApiAuth::class, 'updateProfile']);
    Route::post('/checkout', [Checkout::class,'process']);
    Route::get('/checkout/status/{invoiceNumber}', [Checkout::class, 'checkStatus']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);
    
    // 1. Ini tetep biarin aja, nanti bakal dipake sama halaman Order History
    Route::get('/history', [OrderController::class, 'history']); 

    // 🚨 2. TAMBAHIN INI! Biar api.get('/orders') di Order Status gak error 404
    // Kita "numpang" ke fungsi history karena isinya sama-sama daftar pesanan
    Route::get('/orders', [OrderController::class, 'history']); 
    
    // 3. Ini buat nampilin detail order spesifik pake ID
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});