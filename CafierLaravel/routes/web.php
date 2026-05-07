<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('login');
});

Route::get('/forgot-password', function () {
    return view('forgot-password');
})->name('password.request');

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/daftar-menu', function () {
    return view('daftar-menu'); 
})->name('menu.index');

Route::get('/daftar-membership', function () {
    return view('daftar-membership');
})->name('membership.index');

Route::get('/daftar-karyawan', function () {
    return view('daftar-karyawan');
})->name('karyawan.index');

Route::get('/keuangan', function () {
    return view('pengeluaran-pemasukan');
})->name('keuangan.index');

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TransactionController;

Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('transactions', TransactionController::class);