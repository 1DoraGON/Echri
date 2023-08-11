<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('color_start')->nullable();
            $table->text('color_end')->nullable();
            $table->text('tags')->nullable();
            $table->string('main_image');
            $table->decimal('price', 8, 2);
            $table->integer('stock')->nullable();
             // Add the quantity column
             $table->unsignedBigInteger('category_id'); // Foreign key column
             $table->timestamps();
 
             // Define the foreign key constraint
             $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
