<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Models\Transaction; 
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    // Fungsi bawaan lu buat nampilin semua order (mungkin buat admin/barista)
    public function index()
    {
        return response()->json($this->orderService->getAll());
    }

    // FUNGSI BARU: Buat narik riwayat pesanan user yang lagi login
    public function history()
    {
        // Tangkep data user yang lagi login
        $user = Auth::user();

        // Cari riwayat pesanan berdasarkan ID user (di MongoDB pake _id)
        $history = Transaction::where('customer_id', $user->_id)
            ->orderBy('created_at', 'desc') // Urutin dari yang paling baru
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil riwayat pesanan',
            'data' => $history
        ], 200);
    }

    // Fungsi bawaan lu buat bikin order baru
    public function store(Request $request)
    {
        $order = $this->orderService->create($request->all());

        return response()->json($order);
    }

    // Fungsi bawaan lu buat nampilin detail 1 order
    public function show($id)
    {
        return response()->json($this->orderService->find($id));
    }

    // Fungsi bawaan lu buat ngehapus order
    public function destroy($id)
    {
        $this->orderService->delete($id);

        return response()->json([
            "message" => "Order deleted"
        ]);
    }
}