<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CaseStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => ['required', 'integer', 'exists:clients,id'],
            'title' => ['required', 'string', 'max:200'],
            'case_number' => ['nullable', 'string', 'max:60'],
            'status' => ['nullable', 'in:ativo,pausado,encerrado'],
            'description' => ['nullable', 'string'],
        ];
    }
}
