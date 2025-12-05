<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agendamento;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    public function index(Request $request)
    {
        $query = Agendamento::with(['cliente', 'usuario']);

        if ($request->filled('status')) {
            $query->where('status', $request->status); // agendado, cancelado, realizado
        }

        if ($request->filled('cliente_id')) {
            $query->where('cliente_id', $request->cliente_id);
        }

        if ($request->filled('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        return response()->json(
            $query->orderBy('data_hora', 'desc')->paginate(15)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'usuario_id' => 'nullable|exists:users,id',
            'data_hora'  => 'required|date',
            'tipo'       => 'nullable|string|max:255',
            'status'     => 'nullable|in:agendado,cancelado,realizado',
            'observacoes'=> 'nullable|string',
        ]);

        $agendamento = Agendamento::create($data);

        return response()->json($agendamento->load(['cliente', 'usuario']), 201);
    }

    public function show(Agendamento $agendamento)
    {
        $agendamento->load(['cliente', 'usuario']);

        return response()->json($agendamento);
    }

    public function update(Request $request, Agendamento $agendamento)
    {
        $data = $request->validate([
            'cliente_id' => 'nullable|exists:clientes,id',
            'usuario_id' => 'nullable|exists:users,id',
            'data_hora'  => 'nullable|date',
            'tipo'       => 'nullable|string|max:255',
            'status'     => 'nullable|in:agendado,cancelado,realizado',
            'observacoes'=> 'nullable|string',
        ]);

        $agendamento->update($data);

        return response()->json($agendamento->load(['cliente', 'usuario']));
    }

    public function destroy(Agendamento $agendamento)
    {
        $agendamento->delete();

        return response()->json(null, 204);
    }
}
