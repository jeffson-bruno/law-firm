<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'min:5', 'max:10'],
            'password' => ['required', 'string', 'min:8', 'max:16'],
            'device_name' => ['nullable', 'string', 'max:60'],
        ];
    }
}
