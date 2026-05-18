<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Kalo role user yang lagi login GAK SAMA kayak role yang diminta rute
        if ($request->user()->role !== $role) {
            return response()->json([
                'success' => false,
                'message' => 'Ngapain lu? Akses ditolak bro!'
            ], 403); // 403 Forbidden
        }

        return $next($request);
    }
}