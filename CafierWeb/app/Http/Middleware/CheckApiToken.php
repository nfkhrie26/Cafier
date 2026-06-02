<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Cek apakah token ada?
        $hasToken = session()->has('api_token');
        
        // 2. Cek apakah data user ada dan rolenya beneran 'owner'?
        $isOwner = session()->has('user_data') && session('user_data')['role'] === 'owner';

        // Kalo salah satu syarat ga terpenuhi, tendang!
        if (!$hasToken || !$isOwner) {
            // Bersihin brankas session biar bener-bener bersih
            session()->forget(['api_token', 'user_data']);
            
            return redirect()->route('login')->withErrors([
                'login' => 'Akses ilegal! Halaman ini khusus Owner Cafier.'
            ]);
        }

        // Kalo aman, silakan lewat
        return $next($request);
    }
}