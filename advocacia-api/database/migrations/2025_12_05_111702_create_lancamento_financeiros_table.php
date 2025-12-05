<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lancamentos_financeiros', function (Blueprint $table) {
            $table->id();

            $table->enum('tipo', ['receber', 'pagar']);
            $table->string('categoria')->nullable();  // honorarios, custas, etc.

            $table->foreignId('cliente_id')
                ->nullable()
                ->constrained('clientes')
                ->nullOnDelete();

            $table->foreignId('processo_id')
                ->nullable()
                ->constrained('processos')
                ->nullOnDelete();

            $table->string('descricao')->nullable();
            $table->decimal('valor', 15, 2);

            $table->date('data_vencimento');
            $table->date('data_pagamento')->nullable();

            $table->enum('status', ['pendente', 'pago', 'atrasado'])->default('pendente');

            $table->timestamps();

            $table->index(['tipo', 'status', 'data_vencimento']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lancamentos_financeiros');
    }
};
