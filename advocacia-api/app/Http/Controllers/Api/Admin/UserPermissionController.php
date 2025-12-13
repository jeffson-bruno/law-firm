<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserPermissionController extends Controller
{
    public function updateFinanceAccess(Request $request, int $id)
    {
        $data = $request->validate([
            'can_access_finance' => ['required', 'boolean'],
        ]);

        $user = User::query()->findOrFail($id);

        // Admin sempre tem acesso por role, então faz sentido bloquear mudar o admin
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Não é permitido alterar permissão financeira de admin.',
            ], 422);
        }

        $user->can_access_finance = (bool) $data['can_access_finance'];
        $user->save();

        return response()->json([
            'message' => 'Permissão financeira atualizada.',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'role' => $user->role,
                'can_access_finance' => (bool) $user->can_access_finance,
            ],
        ]);
    }
}
