<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('products', function (Blueprint $table) {
            $table->index('category_id'); 
            $table->index('name');
            $table->index('is_available'); // Biar app mobile cuma nampilin yang ready
        });
    }

    public function down() {
        Schema::dropIfExists('products');
    }
};