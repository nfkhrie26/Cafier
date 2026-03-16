<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('point_logs', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('transaction_id'); 
            $table->index('type'); // 'earn', 'redeem', 'refund', 'adjustment'
        });
    }

    public function down() {
        Schema::dropIfExists('point_logs');
    }
};