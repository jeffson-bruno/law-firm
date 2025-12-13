<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FinanceAccessMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Não autenticado.'], 401);
        }

        $allowed = $user->role === 'admin' || (bool) $user->can_access_finance;

        if (!$allowed) {
            return response()->json(['message' => 'Sem permissão para o financeiro.'], 403);
        }

        return $next($request);
    }
}
