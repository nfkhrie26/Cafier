<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\KeuanganController;
use App\Http\Controllers\ApiWeb\DashboardController;

// RUTE OTENTIKASI (LOGIN & PASSWORD)
Route::get('/', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Ini adalah Backend API CafierLaravel. Silakan buka aplikasi web Anda di port sebelahnya (CafierWeb).'
    ]);
});

// Redirect rute nyasar ke frontend
Route::get('/daftar-menu', function () {
    return redirect('http://127.0.0.1:8001/menu');
});

Route::get('/keuangan', function () {
    return redirect('http://127.0.0.1:8001/pengeluaran-pemasukan');
});

Route::get('/dashboard', function () {
    return redirect('http://127.0.0.1:8001/dashboard');
});

// RUTE API (Untuk Aplikasi Mobile)
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('transactions', TransactionController::class);