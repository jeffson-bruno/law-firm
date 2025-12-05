<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentoJuridico extends Model
{
    use HasFactory;

    protected $table = 'documentos_juridicos';

    protected $fillable = [
        'tipo',
        'titulo',
        'processo_id',
        'cliente_id',
        'conteudo',
        'gerado_por_id',
        'gerado_em',
    ];

    protected $casts = [
        'gerado_em' => 'datetime',
    ];

    public function processo()
    {
        return $this->belongsTo(Processo::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function geradoPor()
    {
        return $this->belongsTo(User::class, 'gerado_por_id');
    }
}

