<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarefa extends Model
{
    use HasFactory;

    protected $table = 'tarefas';

    protected $fillable = [
        'processo_id',
        'responsavel_id',
        'titulo',
        'descricao',
        'prioridade',
        'status',
        'data_inicio',
        'data_vencimento',
        'data_conclusao',
    ];

    protected $casts = [
        'data_inicio' => 'datetime',
        'data_vencimento' => 'datetime',
        'data_conclusao' => 'datetime',
    ];

    public function processo()
    {
        return $this->belongsTo(Processo::class);
    }

    public function responsavel()
    {
        return $this->belongsTo(User::class, 'responsavel_id');
    }

    public function notificacoes()
    {
        return $this->hasMany(Notificacao::class);
    }
}
