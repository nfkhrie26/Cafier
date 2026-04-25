<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category; // 🚨 WAJIB IMPORT INI BUAT NYARI KATEGORI
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Bersihin data lama biar gak numpuk
        Product::truncate();

        // 2. CULIK BAPAKNYA (KATEGORI) DULU DARI DATABASE!
        // Kita cari berdasarkan 'nama' yang udah lu bikin di CategorySeeder
        $coffeeCategory = Category::where('name', 'Coffee')->first();
        $nonCoffeeCategory = Category::where('name', 'Non Coffee')->first();
        $dessertCategory = Category::where('name', 'Desserts')->first();

        // 🚨 SKEPTIS CHECK: Pastiin kategorinya beneran ada!
        if (!$coffeeCategory || !$nonCoffeeCategory || !$dessertCategory) {
            $this->command->error('GAGAL BOS! Kategori belum lengkap. Run CategorySeeder dulu!');
            return;
        }

        // 3. Siapin data produk pake ID Kategori yang udah diculik
        $products = [
            // --- MENU COFFEE ---
            [
                // Ambil _id dari hasil pencarian di atas
                'category_id' => $coffeeCategory->_id, 
                'name' => 'Latte',
                'description' => 'Espresso with steamed milk and a layer of foam',
                'price' => 32000,
                'is_available' => true,
                'image' => asset('storage/products/latte.png'), 
            ],
            [
                'category_id' => $coffeeCategory->_id,
                'name' => 'Americano',
                'description' => 'Espresso with water',
                'price' => 25000,
                'is_available' => true,
                'image' => asset('storage/categories/coffee.png'),
            ],

            // --- MENU NON COFFEE ---
            [
                'category_id' => $nonCoffeeCategory->_id,
                'name' => 'Matcha Latte',
                'description' => 'Premium matcha green tea with fresh milk',
                'price' => 28000,
                'is_available' => true,
                'image' => asset('storage/products/matcha.png'),
            ],

            // --- MENU DESSERTS ---
            [
                'category_id' => $dessertCategory->_id,
                'name' => 'Mochi',
                'description' => 'Glutinous rice flour with red bean or fruit filling',
                'price' => 15000,
                'stock' => 20, // Makanan wajib pake stock
                'image' => asset('storage/products/mochi.png'),
            ],
            [
                'category_id' => $dessertCategory->_id,
                'name' => 'Croissant',
                'description' => 'Wheat flour with butter and yeast',
                'price' => 25000,
                'stock' => 15,
                'image' => asset('storage/products/croissant.png'),
            ],
        ];

        // 4. Suntik ke MongoDB
        foreach ($products as $item) {
            Product::create($item);
        }

        $this->command->info('Data Produk berhasil disuntik lengkap dengan relasinya bos! 🚀');
    }
}