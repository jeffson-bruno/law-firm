<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'cpf' => ['nullable', 'string', 'max:20'],    // pode vir com máscara, normalizamos no model
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],  // pode vir com máscara, normalizamos no model
            'birth_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
