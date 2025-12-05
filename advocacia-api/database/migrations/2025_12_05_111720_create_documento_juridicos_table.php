<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documentos_juridicos', function (Blueprint $table) {
            $table->id();

            $table->enum('tipo', ['peticao', 'contrato_honorarios', 'outro'])
                  ->default('peticao');

            $table->string('titulo');

            $table->foreignId('processo_id')
                ->nullable()
                ->constrained('processos')
                ->nullOnDelete();

            $table->foreignId('cliente_id')
                ->nullable()
                ->constrained('clientes')
                ->nullOnDelete();

            $table->longText('conteudo'); // texto da petição / contrato

            $table->foreignId('gerado_por_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->dateTime('gerado_em')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documentos_juridicos');
    }
};
