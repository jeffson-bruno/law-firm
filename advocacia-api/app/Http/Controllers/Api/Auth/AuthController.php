<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'min:5', 'max:10'],
            'password' => ['required', 'string', 'min:8', 'max:16'],
            'device_name' => ['nullable', 'string', 'max:60'],
        ]);

        $rememberDevice = $validated['device_name'] ?? 'web';

        if (!Auth::attempt([
            'username' => $validated['username'],
            'password' => $validated['password'],
        ])) {
            throw ValidationException::withMessages([
                'username' => ['Credenciais inválidas.'],
            ]);
        }

        $user = $request->user();

        // Tokens por sessão/dispositivo: não derruba logins antigos.
        $token = $user->createToken($rememberDevice)->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'role' => $user->role,
                'can_access_finance' => (bool) $user->can_access_finance,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        // Revoga SOMENTE o token atual
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso.',
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        $showFinance = $user->role === 'admin' || (bool) $user->can_access_finance;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'can_access_finance' => (bool) $user->can_access_finance,
            ],
            'flags' => [
                'show_finance' => $showFinance,
                'show_reports' => $user->role === 'admin',
                'show_marketing' => $user->role === 'admin',
            ],
        ]);
    }
}
