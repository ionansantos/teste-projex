<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('imoveis', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('purchase_price', 10, 2);
            $table->decimal('sale_price', 10, 2);
            $table->decimal('profit_percentage', 5, 2);
            $table->integer('in_stock');
            $table->string('imagem', 100)->comment('Logo do Imovel');
            $table->unsignedBigInteger('user_id')->nullable(); // Adicionando a coluna user_id

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('imoveis');
    }
};
