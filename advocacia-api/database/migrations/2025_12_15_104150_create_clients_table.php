<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();

            $table->string('name', 120);
            $table->string('cpf', 11)->nullable()->unique(); // só números
            $table->string('email')->nullable()->index();
            $table->string('phone', 20)->nullable()->index(); // só números (pode ter 10/11/13 com DDI)
            $table->date('birth_date')->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
