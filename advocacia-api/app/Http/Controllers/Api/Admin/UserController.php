<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        // Segurança: só admin pode criar outro admin e liberar can_access_finance,
        // mas como já estamos no middleware role:admin, ok.
        // Mesmo assim, por padrão: can_access_finance=false se não vier.
        $canAccessFinance = (bool) ($data['can_access_finance'] ?? false);

        // Regra extra: admin sempre pode acessar finance
        if ($data['role'] === 'admin') {
            $canAccessFinance = true;
        }

        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'] ?? null,
            'role' => $data['role'],
            'can_access_finance' => $canAccessFinance,
            'password' => Hash::make($data['password']),
        ]);

        return response()->json([
            'message' => 'Usuário criado com sucesso.',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'can_access_finance' => (bool) $user->can_access_finance,
            ],
        ], 201);
    }
}

