<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function getAll()
    {
        return Category::all();
    }

    public function create($data)
    {
        return Category::create([
            'name' => $data['name']
        ]);
    }

    public function find($id)
    {
        return Category::find($id);
    }

    public function update($id, $data)
    {
        $category = Category::find($id);

        if ($category) {
            $category->update([
                'name' => $data['name']
            ]);
        }

        return $category;
    }

    public function delete($id)
    {
        return Category::destroy($id);
    }
}