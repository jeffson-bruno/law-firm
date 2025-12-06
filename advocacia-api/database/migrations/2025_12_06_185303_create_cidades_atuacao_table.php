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
        Schema::create('cidades_atuacao', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('estado', 2)->nullable(); // UF: PI, SP, RJ...
            $table->string('cep_padrao', 8)->nullable(); // 8 dígitos, sem máscara
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cidades_atuacao');
    }

};
