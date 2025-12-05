<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('processos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cliente_id')
                ->constrained('clientes')
                ->onDelete('cascade');

            $table->foreignId('tipo_processo_id')
                ->nullable()
                ->constrained('tipos_processos')
                ->nullOnDelete();

            $table->foreignId('advogado_responsavel_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('titulo');
            $table->string('numero_processo')->nullable();
            $table->string('vara_comarca')->nullable();
            $table->string('cidade', 100)->nullable();
            $table->string('estado', 2)->nullable();

            $table->enum('status', [
                'ativo',
                'em_andamento',
                'encerrado',
                'arquivado',
                'suspenso',
            ])->default('ativo');

            $table->date('data_distribuicao')->nullable();
            $table->date('prazo_principal')->nullable();
            $table->date('data_proxima_movimentacao')->nullable();
            $table->text('descricao')->nullable();

            $table->timestamps();

            $table->index(['status', 'prazo_principal']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('processos');
    }
};
