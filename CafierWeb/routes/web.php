<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\PemasukanController;

Route::get('/', [AuthController::class, 'showLoginForm']);

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'processLogin'])->name('login.process');
Route::get('/forgot-password', function () {
    return view('forgot-password');
})->name('password.request');

Route::get('/dashboard', function () {
    return 'Selamat datang di Dashboard CafierWeb! Token lu: ' . session('api_token');
})->name('dashboard');

Route::middleware(['api_auth'])->group(function () {
    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
    Route::post('/menu/store', [MenuController::class, 'store'])->name('menu.store');
    Route::put('/menu/update/{id}', [MenuController::class, 'update'])->name('menu.update');
    
    Route::get('/daftar-membership', [MembershipController::class, 'index'])->name('membership.index');
    Route::put('/daftar-membership/update/{id}', [MembershipController::class, 'update']);
    Route::delete('/daftar-membership/delete/{id}', [MembershipController::class, 'destroy']);

    Route::get('/pengeluaran-pemasukan', [PemasukanController::class, 'index'])->name('keuangan.index');
    Route::post('/pengeluaran-pemasukan/expense', [PemasukanController::class, 'storeExpense'])->name('keuangan.storeExpense');
});