<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notificacao;
use Illuminate\Http\Request;

class NotificacaoController extends Controller
{
    public function index(Request $request)
    {
        $query = Notificacao::with(['usuario', 'tarefa', 'processo']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('lida')) {
            $query->where('lida', filter_var($request->lida, FILTER_VALIDATE_BOOLEAN));
        }

        return response()->json(
            $query->orderBy('created_at', 'desc')->paginate(20)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'    => 'required|exists:users,id',
            'tipo'       => 'required|string|max:255',
            'titulo'     => 'required|string|max:255',
            'mensagem'   => 'required|string',
            'tarefa_id'  => 'nullable|exists:tarefas,id',
            'processo_id'=> 'nullable|exists:processos,id',
            'lida'       => 'boolean',
            'lida_em'    => 'nullable|date',
        ]);

        $notificacao = Notificacao::create($data);

        return response()->json($notificacao->load(['usuario', 'tarefa', 'processo']), 201);
    }

    public function show(Notificacao $notificacao)
    {
        $notificacao->load(['usuario', 'tarefa', 'processo']);

        return response()->json($notificacao);
    }

    public function update(Request $request, Notificacao $notificacao)
    {
        $data = $request->validate([
            'lida'    => 'nullable|boolean',
            'lida_em' => 'nullable|date',
        ]);

        $notificacao->update($data);

        return response()->json($notificacao);
    }

    public function destroy(Notificacao $notificacao)
    {
        $notificacao->delete();

        return response()->json(null, 204);
    }
}
