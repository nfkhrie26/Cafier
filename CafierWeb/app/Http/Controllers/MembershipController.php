<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MembershipController extends Controller
{
    public function index()
    {
        $response = Http::withToken(session('api_token'))
                        ->acceptJson()
                        ->get(env('CAFIER_API_URL') . '/web/memberships');

        $memberships = $response->successful() ? $response->json('data') : [];
        return view('daftar-membership', compact('memberships'));
    }
}