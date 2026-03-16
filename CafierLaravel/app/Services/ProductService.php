<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    public function getAll()
    {
        return Product::all();
    }

    public function create($data)
    {
        return Product::create($data);
    }

    public function find($id)
    {
        return Product::find($id);
    }

    public function update($id, $data)
    {
        $product = Product::find($id);

        if ($product) {
            $product->update($data);
        }

        return $product;
    }

    public function delete($id)
    {
        return Product::destroy($id);
    }
}