<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // 1. Bersihin data lama (Biar gak duplikat pas lu testing)
        Category::truncate();
        Product::truncate();

        // 2. Bikin Kategori
        $catCoffee = Category::create(['name' => 'Coffee', 'image' => 'categories/coffee.png']);
        $catNonCoffee = Category::create(['name' => 'Non Coffee', 'image' => 'categories/noncoffee.png']);
        $catDessert = Category::create(['name' => 'Desserts', 'image' => 'categories/desserts.png']);

        // 3. List Produk Cafier
        $products = [
            // ================== COFFEE ==================
            [
                'category_id' => $catCoffee->_id,
                'name' => 'Americano',
                'description' => 'Kopi hitam murni pejuang begadang',
                'price' => 15000,
                'is_available' => true,
                'image' => 'products/coffee.png',
                'variants' => [
                    [
                        'title' => 'Size',
                        'options' => [
                            ['name' => 'Small', 'extra_price' => 0],
                            ['name' => 'Regular', 'extra_price' => 3000],
                            ['name' => 'Large', 'extra_price' => 6000]
                        ]
                    ],
                    [
                        'title' => 'Temperature',
                        'options' => [
                            ['name' => 'Hot', 'extra_price' => 0],
                            ['name' => 'Ice', 'extra_price' => 2000]
                        ]
                    ]
                ]
            ],
            [
                'category_id' => $catCoffee->_id,
                'name' => 'Latte',
                'description' => 'Kopi susu ngeblend abis',
                'price' => 20000,
                'is_available' => true,
                'image' => 'products/latte.png',
                'variants' => [
                    [
                        'title' => 'Size',
                        'options' => [
                            ['name' => 'Small', 'extra_price' => 0],
                            ['name' => 'Regular', 'extra_price' => 4000],
                            ['name' => 'Large', 'extra_price' => 8000]
                        ]
                    ],
                    [
                        'title' => 'Temperature',
                        'options' => [
                            ['name' => 'Hot', 'extra_price' => 0],
                            ['name' => 'Ice', 'extra_price' => 2000]
                        ]
                    ],
                    [
                        'title' => 'Sugar Level',
                        'options' => [
                            ['name' => 'No Sugar', 'extra_price' => 0],
                            ['name' => 'Less Sugar', 'extra_price' => 0],
                            ['name' => 'Normal Sugar', 'extra_price' => 0]
                        ]
                    ]
                ]
            ],
            [
                'category_id' => $catCoffee->_id,
                'name' => 'Kopi Liong',
                'description' => 'Kopi legendaris warga Bogor',
                'price' => 8000,
                'is_available' => true,
                'image' => 'products/coffee.png',
                'variants' => [
                    [
                        'title' => 'Temperature',
                        'options' => [['name' => 'Hot', 'extra_price' => 0]]
                    ]
                ]
            ],

            // ================== NON COFFEE ==================
            [
                'category_id' => $catNonCoffee->_id,
                'name' => 'Matcha Latte',
                'description' => 'Matcha asli import, bukan kaleng-kaleng',
                'price' => 22000,
                'is_available' => true,
                'image' => 'products/matcha.png',
                'variants' => [
                    [
                        'title' => 'Size',
                        'options' => [
                            ['name' => 'Small', 'extra_price' => 0],
                            ['name' => 'Regular', 'extra_price' => 5000],
                            ['name' => 'Large', 'extra_price' => 10000]
                        ]
                    ],
                    [
                        'title' => 'Temperature',
                        'options' => [
                            ['name' => 'Hot', 'extra_price' => 0],
                            ['name' => 'Ice', 'extra_price' => 2000]
                        ]
                    ],
                    [
                        'title' => 'Sugar Level',
                        'options' => [
                            ['name' => 'Normal Sugar', 'extra_price' => 0],
                            ['name' => 'Less Sugar', 'extra_price' => 0],
                            ['name' => 'No Sugar', 'extra_price' => 0]
                        ]
                    ]
                ]
            ],
            [
                'category_id' => $catNonCoffee->_id,
                'name' => 'Extrajoss',
                'description' => 'Minuman kuli penambah stamina',
                'price' => 6000,
                'is_available' => true,
                'image' => 'products/latte.png',
                'variants' => [
                    [
                        'title' => 'Racikan',
                        'options' => [
                            ['name' => 'Biasa', 'extra_price' => 0],
                            ['name' => 'Pake Susu Kental Manis', 'extra_price' => 3000]
                        ]
                    ]
                ]
            ],
            [
                'category_id' => $catNonCoffee->_id,
                'name' => 'Air Mineral',
                'description' => 'Air keran direbus',
                'price' => 5000,
                'is_available' => true,
                'image' => 'products/airmineral.png',
                'variants' => [
                    [
                        'title' => 'Temperature',
                        'options' => [
                            ['name' => 'Normal', 'extra_price' => 0],
                            ['name' => 'Cold', 'extra_price' => 0],
                            ['name' => 'Ice', 'extra_price' => 1000],
                        ]
                    ]
                ]
            ],

            // ================== DESSERTS (Pake Stock!) ==================
            [
                'category_id' => $catDessert->_id,
                'name' => 'Mochi',
                'description' => 'Kenyal-kenyal bikin nagih',
                'price' => 12000,
                'stock' => 50,
                'image' => 'products/mochi.png',
                'variants' => [
                    [
                        'title' => 'Varian Rasa',
                        'options' => [
                            ['name' => 'Strawberry', 'extra_price' => 0],
                            ['name' => 'Coklat Crunchy', 'extra_price' => 0],
                            ['name' => 'Kacang Merah', 'extra_price' => 0]
                        ]
                    ]
                ]
            ],
            [
                'category_id' => $catDessert->_id,
                'name' => 'Croissant',
                'description' => 'Roti prancis flaky abis',
                'price' => 18000,
                'stock' => 15,
                'image' => 'products/croissant.png',
                'variants' => [
                    [
                        'title' => 'Topping',
                        'options' => [
                            ['name' => 'Polos', 'extra_price' => 0],
                            ['name' => 'Salted Caramel', 'extra_price' => 5000],
                            ['name' => 'Almond Slice', 'extra_price' => 4000]
                        ]
                    ]
                ]
            ],
            [
                'category_id' => $catDessert->_id,
                'name' => 'Donat Sancang',
                'description' => 'Donat kampung empuk',
                'price' => 7000,
                'stock' => 40,
                'image' => 'products/donatsancang.png',
                'variants' => [
                    [
                        'title' => 'Topping',
                        'options' => [
                            ['name' => 'Gula Halus', 'extra_price' => 0],
                            ['name' => 'Keju Parut', 'extra_price' => 3000]
                        ]
                    ]
                ]
            ],
            [
                'category_id' => $catDessert->_id,
                'name' => 'Batagor Bandung',
                'description' => 'ya batagor',
                'price' => 23000,
                'stock' => 33,
                'image' => 'products/donatsancang.png',
                'variants' => [
                    [
                        'title' => 'Hot Level',
                        'options' => [
                            ['name' => 'Gak Pedas', 'extra_price' => 0],
                            ['name' => 'Pedas Sedang', 'extra_price' => 0],
                            ['name' => 'Pedas Mampus', 'extra_price' => 500]
                        ]
                    ]
                ]
            ],
        ];

        foreach ($products as $item) {
            Product::create($item);
        }

        $this->command->info('Cafier Seeder Sukses Terpasang! 🚀');
    }
}