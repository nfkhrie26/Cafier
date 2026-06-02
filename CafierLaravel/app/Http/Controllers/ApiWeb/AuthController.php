<?php

namespace App\Http\Controllers\ApiWeb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validasi inputan JSON yang masuk (Kita namain variabelnya 'login')
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        // 2. Deteksi Otomatis: Ini Email atau Name?
        $loginType = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'name';

       // 3. Cek ke Database pake Auth::attempt
        if (Auth::attempt([$loginType => $request->login, 'password' => $request->password])) {
            $user = Auth::user();
            
            // 🚨 TAMBAHIN GEMBOK ROLE DI SINI
            if ($user->role !== 'owner') {
                return response()->json([
                    'success' => false,
                    'message' => 'Akses ditolak! Lu bukan owner.'
                ], 403); // 403 Forbidden
            }

            // Kalo dia beneran owner, baru cetak Token Sanctum
            $token = $user->createToken('web-admin-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login berhasil bro!',
                'data' => [
                    'user' => $user,
                    'token' => $token
                ]
            ], 200);
        }
    }
}