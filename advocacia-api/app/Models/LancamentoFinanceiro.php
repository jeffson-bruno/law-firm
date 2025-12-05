<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LancamentoFinanceiro extends Model
{
    use HasFactory;

    protected $table = 'lancamentos_financeiros';

    protected $fillable = [
        'tipo',
        'categoria',
        'cliente_id',
        'processo_id',
        'descricao',
        'valor',
        'data_vencimento',
        'data_pagamento',
        'status',
    ];

    protected $casts = [
        'valor' => 'decimal:2',
        'data_vencimento' => 'date',
        'data_pagamento' => 'date',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function processo()
    {
        return $this->belongsTo(Processo::class);
    }

    public function recibo()
    {
        return $this->hasOne(ReciboPagamento::class, 'lancamento_id');
    }
}
