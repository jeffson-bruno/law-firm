<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoProcesso extends Model
{
    use HasFactory;

    protected $table = 'tipos_processos';

    protected $fillable = [
        'nome',
        'area',
        'descricao',
        'ativo',
    ];

    protected $casts = [
        'ativo' => 'boolean',
    ];

    public function processos()
    {
        return $this->hasMany(Processo::class);
    }
}

