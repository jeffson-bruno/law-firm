<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'oab',
        'telefone',
        'ativo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'ativo' => 'boolean',
    ];

    // 🔗 Relacionamentos

    public function processosResponsavel()
    {
        return $this->hasMany(Processo::class, 'advogado_responsavel_id');
    }

    public function tarefas()
    {
        return $this->hasMany(Tarefa::class, 'responsavel_id');
    }

    public function documentosGerados()
    {
        return $this->hasMany(DocumentoJuridico::class, 'gerado_por_id');
    }

    public function notificacoes()
    {
        return $this->hasMany(Notificacao::class);
    }

    public function recibosEnviados()
    {
        return $this->hasMany(ReciboPagamento::class, 'uploaded_by');
    }
}
