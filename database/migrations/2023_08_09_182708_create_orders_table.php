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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->decimal('total_price', 8, 2);
            $table->unsignedBigInteger('user_id')->nullable(); // Foreign key column
            $table->unsignedBigInteger('address_id'); // Foreign key column
            $table->boolean('home_delivery');
            $table->string('status')->default('pending');
            $table->decimal('price_payed',8,2)->default(0);
            $table->string('payment_image')->nullable();
            $table->text('message')->nullable();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('phone_number');
            $table->timestamps();
            // Define the foreign key constraint
            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('cascade');
            // Define the foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
