<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('transactions', function (Blueprint $table) {
            $table->unique('invoice_number'); 
            $table->index('customer_id'); 
            $table->index('barista_id'); 
            $table->index('status'); 
        });
    }

    public function down() {
        Schema::dropIfExists('transactions');
    }
};