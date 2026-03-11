<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('midtrans_logs', function (Blueprint $table) {
            $table->index('order_id'); // Buat nyocokin sama invoice_number di transactions
            $table->index('transaction_status'); 
        });
    }

    public function down() {
        Schema::dropIfExists('midtrans_logs');
    }
};