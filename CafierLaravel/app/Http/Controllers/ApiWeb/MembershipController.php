<?php
namespace App\Http\Controllers\ApiWeb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User; // Asumsi pakai model User
use Illuminate\Support\Facades\Hash;

class MembershipController extends Controller
{
    public function index()
    {
        $members = User::where('role', 'customer')->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Berhasil narik data membership',
            'data' => $members
        ], 200);
    }
}