<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        return response()->json($this->categoryService->getAll());
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