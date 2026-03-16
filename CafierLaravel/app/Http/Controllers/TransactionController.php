<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TransactionService;

class TransactionController extends Controller
{
    protected $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function index()
    {
        return response()->json($this->transactionService->getAll());
    }

    public function store(Request $request)
    {
        $transaction = $this->transactionService->create($request->all());

        return response()->json($transaction);
    }

    public function show($id)
    {
        return response()->json($this->transactionService->find($id));
    }

    public function destroy($id)
    {
        $this->transactionService->delete($id);

        return response()->json([
            "message" => "Transaction deleted"
        ]);
    }
}