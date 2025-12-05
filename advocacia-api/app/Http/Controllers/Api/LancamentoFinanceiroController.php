<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LancamentoFinanceiro;
use Illuminate\Http\Request;

class LancamentoFinanceiroController extends Controller
{
    public function index(Request $request)
    {
        $query = LancamentoFinanceiro::with(['cliente', 'processo', 'recibo']);

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo); // receber/pagar
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status); // pendente/pago/atrasado
        }

        if ($request->filled('cliente_id')) {
            $query->where('cliente_id', $request->cliente_id);
        }

        return response()->json(
            $query->orderBy('data_vencimento', 'desc')->paginate(15)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tipo'            => 'required|in:receber,pagar',
            'categoria'       => 'nullable|string|max:255',
            'cliente_id'      => 'nullable|exists:clientes,id',
            'processo_id'     => 'nullable|exists:processos,id',
            'descricao'       => 'nullable|string|max:255',
            'valor'           => 'required|numeric|min:0',
            'data_vencimento' => 'required|date',
            'data_pagamento'  => 'nullable|date',
            'status'          => 'nullable|in:pendente,pago,atrasado',
        ]);

        $lancamento = LancamentoFinanceiro::create($data);

        return response()->json($lancamento->load(['cliente', 'processo']), 201);
    }

    public function show(LancamentoFinanceiro $lancamentoFinanceiro)
    {
        $lancamentoFinanceiro->load(['cliente', 'processo', 'recibo']);

        return response()->json($lancamentoFinanceiro);
    }

    public function update(Request $request, LancamentoFinanceiro $lancamentoFinanceiro)
    {
        $data = $request->validate([
            'tipo'            => 'sometimes|required|in:receber,pagar',
            'categoria'       => 'nullable|string|max:255',
            'cliente_id'      => 'nullable|exists:clientes,id',
            'processo_id'     => 'nullable|exists:processos,id',
            'descricao'       => 'nullable|string|max:255',
            'valor'           => 'nullable|numeric|min:0',
            'data_vencimento' => 'nullable|date',
            'data_pagamento'  => 'nullable|date',
            'status'          => 'nullable|in:pendente,pago,atrasado',
        ]);

        $lancamentoFinanceiro->update($data);

        return response()->json($lancamentoFinanceiro->load(['cliente', 'processo', 'recibo']));
    }

    public function destroy(LancamentoFinanceiro $lancamentoFinanceiro)
    {
        $lancamentoFinanceiro->delete();

        return response()->json(null, 204);
    }
}
