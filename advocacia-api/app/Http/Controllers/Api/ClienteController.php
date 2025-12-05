<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index(Request $request)
    {
        $query = Cliente::query();

        if ($request->filled('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        if ($request->filled('cpf_cnpj')) {
            $query->where('cpf_cnpj', $request->cpf_cnpj);
        }

        return response()->json(
            $query->orderBy('nome')->paginate(15)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome'            => 'required|string|max:255',
            'cpf_cnpj'        => 'nullable|string|max:20',
            'rg'              => 'nullable|string|max:20',
            'data_nascimento' => 'nullable|date',
            'telefone'        => 'nullable|string|max:30',
            'email'           => 'nullable|email|max:255',
            'endereco'        => 'nullable|string',
            'cidade'          => 'nullable|string|max:100',
            'estado'          => 'nullable|string|max:2',
            'cep'             => 'nullable|string|max:15',
            'observacoes'     => 'nullable|string',
        ]);

        $cliente = Cliente::create($data);

        return response()->json($cliente, 201);
    }

    public function show(Cliente $cliente)
    {
        // opcional: carregar processos, agendamentos etc.
        $cliente->load(['processos', 'agendamentos']);

        return response()->json($cliente);
    }

    public function update(Request $request, Cliente $cliente)
    {
        $data = $request->validate([
            'nome'            => 'sometimes|required|string|max:255',
            'cpf_cnpj'        => 'nullable|string|max:20',
            'rg'              => 'nullable|string|max:20',
            'data_nascimento' => 'nullable|date',
            'telefone'        => 'nullable|string|max:30',
            'email'           => 'nullable|email|max:255',
            'endereco'        => 'nullable|string',
            'cidade'          => 'nullable|string|max:100',
            'estado'          => 'nullable|string|max:2',
            'cep'             => 'nullable|string|max:15',
            'observacoes'     => 'nullable|string',
        ]);

        $cliente->update($data);

        return response()->json($cliente);
    }

    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        return response()->json(null, 204);
    }
}
