<?php

use App\Http\Controllers\api\BaristaOrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController as ApiAuth;
use App\Http\Controllers\Api\CheckoutController as Checkout;    
use App\Http\Controllers\Api\CategoryController;  
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\OrderController; 

use App\Http\Controllers\ApiWeb\AuthController;
use App\Http\Controllers\ApiWeb\DashboardController;
use App\Http\Controllers\ApiWeb\MenuController;
use App\Http\Controllers\ApiWeb\MembershipController;
use App\Http\Controllers\ApiWeb\PemasukanController;

// ==========================================
// 1. RUTE PUBLIC (Nggak Perlu Login)
// ==========================================
Route::post('/register', [ApiAuth::class, 'register']);
Route::post('/login', [ApiAuth::class, 'login']);
Route::post('/webhook/midtrans', [Checkout::class, 'webhook']);

// ========================= 
Route::post('/admin/login', [AuthController::class, 'login']);

// Pastiin rute ini dilindungi middleware auth sanctum!
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/web/menus', [MenuController::class, 'index']);
    Route::get('/web/dashboard', [DashboardController::class, 'index']);
    Route::post('/web/menus', [MenuController::class, 'store']);
    Route::put('/web/menus/{id}', [MenuController::class, 'update']);
    Route::delete('/web/menus/{id}', [MenuController::class, 'destroy']);
    Route::get('/web/memberships', [MembershipController::class, 'index']);
    Route::put('/web/memberships/{id}', [MembershipController::class, 'update']);
    Route::delete('/web/memberships/{id}', [MembershipController::class, 'destroy']);
    
    // Masukin ke dalem grup auth:sanctum
    Route::get('/web/finances', [PemasukanController::class, 'index']);
    });
// =====================================

// ==========================================
// 2. RUTE BERSAMA (Bisa diakses Customer & Barista)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Rute Logout (Cukup di sini aja, nggak usah diulang di tiap role)
    Route::post('/logout', [ApiAuth::class, 'logout']);
    
    // Barista & Customer sama-sama butuh liat menu kan? Taruh sini!
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);
});

// ==========================================
// 3. RUTE KHUSUS CUSTOMER
// ==========================================
Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
    Route::put('/profile', [ApiAuth::class, 'updateProfile']);
    Route::post('/checkout', [Checkout::class,'process']);
    Route::get('/checkout/status/{invoiceNumber}', [Checkout::class, 'checkStatus']);
    
    Route::get('/history', [OrderController::class, 'history']); 
    Route::get('/orders', [OrderController::class, 'history']); 
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});


// ==========================================
// 4. RUTE KHUSUS BARISTA
// ==========================================
Route::middleware(['auth:sanctum', 'role:barista'])->group(function () {
    // Nampilin orderan buat barista
    Route::get('/barista/orders', [BaristaOrderController::class, 'orderShow']);
    
    // 🚨 TAMBAHAN BARU: Rute buat ganti status orderan (Processed/Completed)
    Route::put('/barista/orders/{id}', [BaristaOrderController::class, 'updateStatus']);
    
    // Rute buat update toggle Siap Disajikan & Stok Habis (Udah bener)
    Route::put('/products/{id}', [ProductController::class, 'update']);
});