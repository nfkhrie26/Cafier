<?php

namespace App\Services;

use App\Models\Transaction;

class TransactionService
{
    public function getAll()
    {
        return Transaction::all();
    }

    public function create($data)
    {
        return Transaction::create([
            'invoice' => $data['invoice'],
            'total_price' => $data['total_price'],
            'payment_method' => $data['payment_method'],
            'paid_amount' => $data['paid_amount'],
            'change' => $data['change']
        ]);
    }

    public function find($id)
    {
        return Transaction::find($id);
    }

    public function delete($id)
    {
        return Transaction::destroy($id);
    }
}