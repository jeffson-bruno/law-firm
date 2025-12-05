<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';

    protected $fillable = [
        'nome',
        'cpf_cnpj',
        'rg',
        'data_nascimento',
        'telefone',
        'email',
        'endereco',
        'cidade',
        'estado',
        'cep',
        'observacoes',
    ];

    protected $casts = [
        'data_nascimento' => 'date',
    ];

    // 🔗 Relacionamentos

    public function processos()
    {
        return $this->hasMany(Processo::class);
    }

    public function lancamentosFinanceiros()
    {
        return $this->hasMany(LancamentoFinanceiro::class);
    }

    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class);
    }

    public function documentosJuridicos()
    {
        return $this->hasMany(DocumentoJuridico::class);
    }
}
