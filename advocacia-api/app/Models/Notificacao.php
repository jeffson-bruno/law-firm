<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    use HasFactory;

    protected $table = 'notificacoes';

    protected $fillable = [
        'user_id',
        'tipo',
        'titulo',
        'mensagem',
        'tarefa_id',
        'processo_id',
        'lida',
        'lida_em',
    ];

    protected $casts = [
        'lida' => 'boolean',
        'lida_em' => 'datetime',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tarefa()
    {
        return $this->belongsTo(Tarefa::class);
    }

    public function processo()
    {
        return $this->belongsTo(Processo::class);
    }
}

