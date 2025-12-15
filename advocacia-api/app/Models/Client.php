<?php

namespace App\Models;

use App\Support\Normalizer;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'cpf',
        'email',
        'phone',
        'birth_date',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date:Y-m-d',
        ];
    }

    // Normaliza email sempre lowercase
    public function setEmailAttribute($value): void
    {
        $this->attributes['email'] = Normalizer::email($value);
    }

    // Normaliza cpf: só dígitos
    public function setCpfAttribute($value): void
    {
        $this->attributes['cpf'] = Normalizer::onlyDigits($value);
    }

    // Normaliza phone: só dígitos
    public function setPhoneAttribute($value): void
    {
        $this->attributes['phone'] = Normalizer::onlyDigits($value);
    }
}

