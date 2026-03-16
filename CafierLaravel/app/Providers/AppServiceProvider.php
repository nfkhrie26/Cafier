<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;
use MongoDB\Laravel\Eloquent\Model;


class AppServiceProvider extends ServiceProvider
{
public function boot(): void
{
    // Ini biar Sanctum tau lu pake MongoDB buat simpen token auth
    Sanctum::usePersonalAccessTokenModel(Model::class); 
}
}
