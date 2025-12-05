<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Processo extends Model
{
    use HasFactory;

    protected $table = 'processos';

    protected $fillable = [
        'cliente_id',
        'tipo_processo_id',
        'advogado_responsavel_id',
        'titulo',
        'numero_processo',
        'vara_comarca',
        'cidade',
        'estado',
        'status',
        'data_distribuicao',
        'prazo_principal',
        'data_proxima_movimentacao',
        'descricao',
    ];

    protected $casts = [
        'data_distribuicao' => 'date',
        'prazo_principal' => 'date',
        'data_proxima_movimentacao' => 'date',
    ];

    // 🔗 Relacionamentos

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function tipoProcesso()
    {
        return $this->belongsTo(TipoProcesso::class);
    }

    public function advogadoResponsavel()
    {
        return $this->belongsTo(User::class, 'advogado_responsavel_id');
    }

    public function tarefas()
    {
        return $this->hasMany(Tarefa::class);
    }

    public function lancamentosFinanceiros()
    {
        return $this->hasMany(LancamentoFinanceiro::class);
    }

    public function documentosJuridicos()
    {
        return $this->hasMany(DocumentoJuridico::class);
    }

    public function notificacoes()
    {
        return $this->hasMany(Notificacao::class);
    }
}

