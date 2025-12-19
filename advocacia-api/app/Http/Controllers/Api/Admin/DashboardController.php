<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\CaseModel;

class DashboardController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        $data = [
            "cards" => [
                ["key" => "clientes", "label" => "Clientes", "value" => Client::count()],
                ["key" => "processos", "label" => "Processos", "value" => CaseModel::count()],
                ["key" => "tarefas", "label" => "Tarefas", "value" => 0],

                // Financeiro ainda pode ficar 0 por enquanto (até criarmos o módulo real)
                ["key" => "receitas_mes", "label" => "Receitas (mês)", "value" => 0],
                ["key" => "despesas_mes", "label" => "Despesas (mês)", "value" => 0],
                ["key" => "saldo_mes", "label" => "Saldo (mês)", "value" => 0],
            ],

            "quickActions" => [
                ["key" => "novo_cliente", "label" => "Cadastrar cliente", "href" => "/admin/clientes"],
                ["key" => "novo_processo", "label" => "Novo processo", "href" => "/admin/processos"],
                ["key" => "relatorios", "label" => "Gerar relatório", "href" => "/admin/relatorios"],
                ["key" => "financeiro", "label" => "Controle financeiro", "href" => "/financeiro"],
            ],

            "me" => [
                "id" => $user->id,
                "username" => $user->username,
                "email" => $user->email,
                "can_access_finance" => (bool) $user->can_access_finance,
                "role" => $user->role,
            ],
        ];

        return response()->json($data);
    }
}
