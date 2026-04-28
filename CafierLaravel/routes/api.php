<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController as ApiAuth;
use App\Http\Controllers\Api\CheckoutController as Checkout;    
use App\Http\Controllers\Api\CategoryController;  
use App\Http\Controllers\Api\ProductController;
// 1. Tambahin import ini kalau belum ada:
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
    
    // 2. Tambahin route API history di sini:
    Route::get('/history', [OrderController::class, 'history']);
});