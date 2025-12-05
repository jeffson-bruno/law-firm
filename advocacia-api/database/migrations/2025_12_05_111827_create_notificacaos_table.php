<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notificacoes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('cascade');

            $table->string('tipo');        // tarefa_prazo, financeiro_atrasado, etc.
            $table->string('titulo');
            $table->text('mensagem');

            $table->foreignId('tarefa_id')
                ->nullable()
                ->constrained('tarefas')
                ->nullOnDelete();

            $table->foreignId('processo_id')
                ->nullable()
                ->constrained('processos')
                ->nullOnDelete();

            $table->boolean('lida')->default(false);
            $table->dateTime('lida_em')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notificacoes');
    }
};
