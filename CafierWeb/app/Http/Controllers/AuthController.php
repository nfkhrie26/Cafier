<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('login'); 
    }

    public function processLogin(Request $request)
    {
        // 1. Validasi form dari user
        $request->validate([
            'login' => 'required|string', // Namanya kita ubah jadi login
            'password' => 'required|string',
        ]);

        try {
            // 2. Nembak ke CafierAPI
            $response = Http::post(env('CAFIER_API_URL') . '/admin/login', [
                'login' => $request->login, // Kirim variabel login
                'password' => $request->password,
            ]);

            // 3. Kalo API sukses
            if ($response->successful()) {
                $data = $response->json();

                session([
                    'api_token' => $data['data']['token'],
                    'user_data' => $data['data']['user']
                ]);

                return redirect()->route('dashboard');
            }

            // 4. Kalo API nolak (status 401)
            $errorMessage = $response->json('message') ?? 'Gagal login bro.';
            // Balikin error-nya ke kolom 'login'
            return back()->withErrors(['login' => $errorMessage])->withInput(); 

        } catch (\Exception $e) {
            return back()->withErrors(['login' => 'Server API lagi down/mati!'])->withInput();
        }
    }
}