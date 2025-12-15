<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CaseDeadlineUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'case_id' => ['sometimes', 'required', 'integer', 'exists:cases,id'],
            'title' => ['sometimes', 'required', 'string', 'max:200'],
            'due_date' => ['sometimes', 'required', 'date'],
            'status' => ['sometimes', 'nullable', 'in:pendente,concluido,cancelado'],
            'notes' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
