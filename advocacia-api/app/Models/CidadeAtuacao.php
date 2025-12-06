<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CidadeAtuacao extends Model
{
    use HasFactory;

    protected $table = 'cidades_atuacao';

    protected $fillable = [
        'nome',
        'estado',
        'cep_padrao',
    ];
}

