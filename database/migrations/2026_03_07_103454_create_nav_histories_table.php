<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nav_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mutual_fund_id')->constrained('mutual_funds')->onDelete('cascade');
            $table->date('nav_date');
            $table->decimal('nav_value', 12, 5);
            $table->timestamps();

            $table->index('nav_date');
            $table->unique(['mutual_fund_id', 'nav_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nav_histories');
    }
};
