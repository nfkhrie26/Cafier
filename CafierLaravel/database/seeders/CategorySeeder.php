<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::truncate();

        // 2. Siapin data dummy pake Array
        $categories = [
            [
                'name' => 'Coffee',
                'image' => asset('storage/categories/coffee.png'), 
            ],
            [
                'name' => 'Non Coffee',
                'image' => asset('storage/categories/non-coffee.png'), 
            ],
            [
                'name' => 'Desserts',
                'image' => asset('storage/categories/dessert.png'), 
            ],
           
        ];

        // 3. Masukin ke MongoDB pake looping
        foreach ($categories as $item) {
            Category::create($item);
        }
    }
}
