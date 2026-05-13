<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\KeuanganController;

// RUTE OTENTIKASI (LOGIN & PASSWORD)
Route::get('/', function () {
    return view('login');
});

Route::get('/forgot-password', function () {
    return view('forgot-password');
})->name('password.request');


// RUTE DASHBOARD & HALAMAN STATIS
Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/daftar-membership', function () {
    return view('daftar-membership');
})->name('membership.index');

Route::get('/daftar-karyawan', function () {
    return view('daftar-karyawan');
})->name('karyawan.index');

// RUTE MENU KAFE (Diurus oleh MenuController)
Route::get('/daftar-menu', [MenuController::class, 'index'])->name('menu.index');
Route::post('/pemilik/menu/store', [MenuController::class, 'store'])->name('menu.store');
Route::put('/pemilik/menu/update/{id}', [MenuController::class, 'update'])->name('menu.update');
Route::get('/keuangan', [KeuanganController::class, 'index'])->name('keuangan.index');


// RUTE API (Untuk Aplikasi Mobile)
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('transactions', TransactionController::class);