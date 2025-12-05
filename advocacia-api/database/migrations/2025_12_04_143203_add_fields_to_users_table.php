<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->enum('role', ['admin', 'advogado', 'assistente', 'atendente'])
                  ->default('advogado')
                  ->after('password');

            $table->string('oab')->nullable()->after('role');
            $table->string('telefone', 30)->nullable()->after('oab');
            $table->boolean('ativo')->default(true)->after('telefone');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'oab', 'telefone', 'ativo']);
        });
    }
};
