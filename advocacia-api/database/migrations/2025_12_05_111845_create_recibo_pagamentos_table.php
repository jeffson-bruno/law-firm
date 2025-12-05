<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recibos_pagamentos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lancamento_id')
                ->constrained('lancamentos_financeiros')
                ->onDelete('cascade');

            $table->string('nome_arquivo');
            $table->string('mime_type');
            $table->unsignedBigInteger('tamanho')->nullable();

            // BLOB para conteúdo do comprovante (tamanho moderado)
            $table->binary('conteudo');


            $table->foreignId('uploaded_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recibos_pagamentos');
    }
};
