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
        Schema::create('mutual_funds', function (Blueprint $table) {
            $table->id();
            $table->string('scheme_code')->unique();
            $table->string('scheme_name');
            $table->string('slug')->index();
            $table->foreignId('fund_house_id')->nullable()->constrained('fund_houses')->onDelete('cascade');
            $table->string('scheme_type')->nullable();
            $table->string('scheme_category')->nullable();
            $table->string('isin_growth')->nullable();
            $table->string('isin_div_reinvestment')->nullable();
            $table->timestamps();

            $table->index('scheme_name');
            $table->index('scheme_code');
            $table->index('fund_house_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mutual_funds');
    }
};
