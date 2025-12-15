<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('case_deadlines', function (Blueprint $table) {
            $table->id();

            $table->foreignId('case_id')->constrained('cases')->cascadeOnDelete();

            $table->string('title', 200);
            $table->date('due_date')->index();
            $table->enum('status', ['pendente', 'concluido', 'cancelado'])->default('pendente')->index();
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index(['case_id', 'due_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_deadlines');
    }
};
