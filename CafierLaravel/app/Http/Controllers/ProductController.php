<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        return response()->json($this->productService->getAll());
    }

    public function store(Request $request)
    {
        $product = $this->productService->create($request->all());

        return response()->json($product);
    }

    public function show($id)
    {
        return response()->json($this->productService->find($id));
    }

    public function update(Request $request, $id)
    {
        $product = $this->productService->update($id, $request->all());

        return response()->json($product);
    }

    public function destroy($id)
    {
        $this->productService->delete($id);

        return response()->json([
            "message" => "Product deleted"
        ]);
    }
}