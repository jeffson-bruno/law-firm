<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // o middleware role:admin já protege
    }

    public function rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'min:5',
                'max:10',
                'regex:/^[a-zA-Z0-9_]+$/',
                Rule::unique('users', 'username'),
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'max:16',
            ],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('users', 'email'),
            ],
            'role' => [
                'required',
                Rule::in(['admin', 'advogado', 'recepcao']),
            ],
            'can_access_finance' => [
                'sometimes',
                'boolean',
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $email = $this->input('email');

        $this->merge([
            'username' => is_string($this->input('username')) ? trim($this->input('username')) : $this->input('username'),
            'email' => is_string($email) ? strtolower(trim($email)) : $email,
        ]);
    }

    public function messages(): array
    {
        return [
            'username.regex' => 'O username pode conter apenas letras, números e underline (_).',
            'role.in' => 'Perfil inválido. Use: admin, advogado ou recepcao.',
        ];
    }
}
