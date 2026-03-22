<?php

namespace App\Services;

use App\Models\Order;

class OrderService
{
    public function getAll()
    {
        return Order::all();
    }

    public function create($data)
    {
        return Order::create([
            'invoice' => $data['invoice'],
            'products' => $data['products'],
            'total_price' => $data['total_price'],
            'payment_method' => $data['payment_method']
        ]);
    }

    public function find($id)
    {
        return Order::find($id);
    }

    public function delete($id)
    {
        return Order::destroy($id);
    }
}