<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage; // 🚨 Wajib ditambahin buat ngurus file!

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // 1. Validasi Input (Tambahkan dob di sini)
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'dob' => 'required|date', // Wajib diisi agar tidak kosong di profil
        ]);

        // 2. Simpan ke Database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'customer', // Hardcode customer (Barista dibuat via Web)
            'dob' => $request->dob,   // Tambahkan dob ke database
        ]);

        // Bikin Karcis (Token)
        $token = $user->createToken('mobile-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // API LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // Cek user ada gak, dan password cocok gak?
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Kredensial salah bro!'], 401);
        }

        $token = $user->createToken('mobile-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token,
            'role' => $user->role
        ]);
    }

    public function logout(Request $request)
    {
        // Menghapus token yang sedang digunakan saat ini
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Token berhasil dihapus, cabut!'
        ]);
    }

    // API UPDATE PROFILE
    public function updateProfile(Request $request)
    {
        $user = $request->user(); // Langsung ambil user yang sedang login

        // 🚨 Tambahin validasi buat foto (maksimal 2MB)
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->_id . ',_id',
            'password' => 'nullable|min:8',
            'dob' => 'nullable|date', 
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', 
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->dob = $request->dob; 

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        // 🚨 LOGIKA UPLOAD FOTO
        if ($request->hasFile('photo')) {
            // Hapus foto lama kalau ada, biar server gak penuh
            if ($user->photo) {
                // Ekstrak nama file dari URL lama
                $oldPath = str_replace(url('storage') . '/', '', $user->photo);
                Storage::disk('public')->delete($oldPath);
            }

            // Simpan file baru ke folder 'storage/app/public/profiles'
            $path = $request->file('photo')->store('profiles', 'public');
            
            // Simpan URL lengkapnya ke MongoDB biar gampang dipanggil di React Native
            $user->photo = url('storage/' . $path);
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profil berhasil diperbarui!',
            'user' => $user
        ]);
    }
}