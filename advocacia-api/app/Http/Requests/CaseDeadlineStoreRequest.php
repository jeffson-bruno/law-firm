<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CaseDeadlineStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'case_id' => ['required', 'integer', 'exists:cases,id'],
            'title' => ['required', 'string', 'max:200'],
            'due_date' => ['required', 'date'],
            'status' => ['nullable', 'in:pendente,concluido,cancelado'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
