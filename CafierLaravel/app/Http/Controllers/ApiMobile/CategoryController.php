<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Services\CategoryService;
use App\Models\Product;
use App\Models\Category;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        // Tarik semua data kategori dari MongoDB
        $categories = Category::all();

        // Balikin dalam bentuk JSON standar API
        return response()->json([
            'success' => true,
            'message' => 'Berhasil ngambil daftar kategori',
            'data' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $category = $this->categoryService->create($request->all());

        return response()->json($category);
    }

    public function show($id)
    {
        return response()->json($this->categoryService->find($id));
    }

    public function update(Request $request, $id)
    {
        $category = $this->categoryService->update($id, $request->all());

        return response()->json($category);
    }

    public function destroy($id)
    {
        $this->categoryService->delete($id);

        return response()->json([
            "message" => "Category deleted"
        ]);
    }
}