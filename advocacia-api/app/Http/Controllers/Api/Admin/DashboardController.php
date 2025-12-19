<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        // TODO: troque pelos seus models reais (Clientes, Processos, etc.)
        // Exemplo genérico:
        $data = [
            "cards" => [
                ["key" => "clientes", "label" => "Clientes", "value" => 0],
                ["key" => "processos", "label" => "Processos", "value" => 0],
                ["key" => "tarefas", "label" => "Tarefas", "value" => 0],
                ["key" => "receitas_mes", "label" => "Receitas (mês)", "value" => 0],
                ["key" => "despesas_mes", "label" => "Despesas (mês)", "value" => 0],
                ["key" => "saldo_mes", "label" => "Saldo (mês)", "value" => 0],
            ],
            "quickActions" => [
                ["key" => "novo_cliente", "label" => "Cadastrar cliente", "href" => "/admin/clientes/novo"],
                ["key" => "novo_processo", "label" => "Novo processo", "href" => "/admin/processos/novo"],
            ],
            "me" => [
                "id" => $user->id,
                "username" => $user->username,
                "email" => $user->email,
                // isso vai ser útil já já pra sidebar:
                "can_access_finance" => (bool) $user->can_access_finance,
                "role" => $user->role ?? null,
            ],
        ];

        return response()->json($data);
    }
}
