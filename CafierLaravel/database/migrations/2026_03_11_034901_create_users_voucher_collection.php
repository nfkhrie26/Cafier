<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('user_vouchers', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('is_used'); 
            $table->index('expired_at'); 
            $table->index('source'); 
        });
    }

    public function down() {
        Schema::dropIfExists('user_vouchers');
    }
};