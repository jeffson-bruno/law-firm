<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agendamentos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cliente_id')
                ->constrained('clientes')
                ->onDelete('cascade');

            $table->foreignId('usuario_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->dateTime('data_hora');
            $table->string('tipo')->nullable(); // consulta inicial, retorno, etc.

            $table->enum('status', ['agendado', 'cancelado', 'realizado'])
                  ->default('agendado');

            $table->text('observacoes')->nullable();

            $table->timestamps();

            $table->index(['status', 'data_hora']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agendamentos');
    }
};
