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

<<<<<<< HEAD
// RUTE DASHBOARD & HALAMAN STATIS
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

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

=======
Route::get('/dashboard', function () {
    return redirect('http://127.0.0.1:8001/dashboard');
});
>>>>>>> f6761fdcc1b9f65da979757bd830d7fb15a3e555

// RUTE API (Untuk Aplikasi Mobile)
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('transactions', TransactionController::class);