<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cases', function (Blueprint $table) {
            $table->id();

            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();

            $table->string('title', 200);                 // título interno do processo
            $table->string('case_number', 60)->nullable()->index(); // número do processo (CNJ etc.)
            $table->enum('status', ['ativo','pausado','encerrado'])->default('ativo')->index();

            $table->text('description')->nullable();

            $table->timestamps();

            // evita duplicar mesmo número dentro do mesmo cliente (ajuda muito)
            $table->unique(['client_id', 'case_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cases');
    }
};
