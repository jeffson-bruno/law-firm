<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tarefas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('processo_id')
                ->nullable()
                ->constrained('processos')
                ->nullOnDelete();

            $table->foreignId('responsavel_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('titulo');
            $table->text('descricao')->nullable();

            $table->enum('prioridade', ['baixa', 'media', 'alta'])->default('media');

            $table->enum('status', ['pendente', 'em_andamento', 'concluida'])
                  ->default('pendente');

            $table->dateTime('data_inicio')->nullable();
            $table->dateTime('data_vencimento')->nullable();
            $table->dateTime('data_conclusao')->nullable();

            $table->timestamps();

            $table->index(['status', 'data_vencimento']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tarefas');
    }
};
