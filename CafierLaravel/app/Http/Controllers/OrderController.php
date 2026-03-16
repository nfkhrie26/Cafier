<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index()
    {
        return response()->json($this->orderService->getAll());
    }

    public function store(Request $request)
    {
        $order = $this->orderService->create($request->all());

        return response()->json($order);
    }

    public function show($id)
    {
        return response()->json($this->orderService->find($id));
    }

    public function destroy($id)
    {
        $this->orderService->delete($id);

        return response()->json([
            "message" => "Order deleted"
        ]);
    }
}