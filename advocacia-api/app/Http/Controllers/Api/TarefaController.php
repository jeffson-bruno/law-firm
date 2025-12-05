<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tarefa;
use Illuminate\Http\Request;

class TarefaController extends Controller
{
    public function index(Request $request)
    {
        $query = Tarefa::with(['processo', 'responsavel']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('responsavel_id')) {
            $query->where('responsavel_id', $request->responsavel_id);
        }

        if ($request->filled('processo_id')) {
            $query->where('processo_id', $request->processo_id);
        }

        return response()->json(
            $query->orderBy('data_vencimento')->paginate(15)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'processo_id'    => 'nullable|exists:processos,id',
            'responsavel_id' => 'nullable|exists:users,id',
            'titulo'         => 'required|string|max:255',
            'descricao'      => 'nullable|string',
            'prioridade'     => 'nullable|in:baixa,media,alta',
            'status'         => 'nullable|in:pendente,em_andamento,concluida',
            'data_inicio'    => 'nullable|date',
            'data_vencimento'=> 'nullable|date',
            'data_conclusao' => 'nullable|date',
        ]);

        $tarefa = Tarefa::create($data);

        return response()->json($tarefa->load(['processo', 'responsavel']), 201);
    }

    public function show(Tarefa $tarefa)
    {
        $tarefa->load(['processo', 'responsavel']);

        return response()->json($tarefa);
    }

    public function update(Request $request, Tarefa $tarefa)
    {
        $data = $request->validate([
            'processo_id'    => 'nullable|exists:processos,id',
            'responsavel_id' => 'nullable|exists:users,id',
            'titulo'         => 'sometimes|required|string|max:255',
            'descricao'      => 'nullable|string',
            'prioridade'     => 'nullable|in:baixa,media,alta',
            'status'         => 'nullable|in:pendente,em_andamento,concluida',
            'data_inicio'    => 'nullable|date',
            'data_vencimento'=> 'nullable|date',
            'data_conclusao' => 'nullable|date',
        ]);

        $tarefa->update($data);

        return response()->json($tarefa->load(['processo', 'responsavel']));
    }

    public function destroy(Tarefa $tarefa)
    {
        $tarefa->delete();

        return response()->json(null, 204);
    }
}
