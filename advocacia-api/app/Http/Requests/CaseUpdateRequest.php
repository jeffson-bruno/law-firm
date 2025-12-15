<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CaseUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => ['sometimes', 'required', 'integer', 'exists:clients,id'],
            'title' => ['sometimes', 'required', 'string', 'max:200'],
            'case_number' => ['sometimes', 'nullable', 'string', 'max:60'],
            'status' => ['sometimes', 'nullable', 'in:ativo,pausado,encerrado'],
            'description' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
