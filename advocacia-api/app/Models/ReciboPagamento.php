<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReciboPagamento extends Model
{
    use HasFactory;

    protected $table = 'recibos_pagamentos';

    protected $fillable = [
        'lancamento_id',
        'nome_arquivo',
        'mime_type',
        'tamanho',
        'conteudo',
        'uploaded_by',
    ];

    protected $casts = [
        'tamanho' => 'integer',
    ];

    public function lancamento()
    {
        return $this->belongsTo(LancamentoFinanceiro::class, 'lancamento_id');
    }

    public function usuarioUpload()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
