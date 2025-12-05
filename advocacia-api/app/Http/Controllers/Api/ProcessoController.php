<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Processo;
use Illuminate\Http\Request;

class ProcessoController extends Controller
{
    public function index(Request $request)
    {
        $query = Processo::with(['cliente', 'tipoProcesso', 'advogadoResponsavel']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('cliente_id')) {
            $query->where('cliente_id', $request->cliente_id);
        }

        if ($request->filled('tipo_processo_id')) {
            $query->where('tipo_processo_id', $request->tipo_processo_id);
        }

        return response()->json(
            $query->orderBy('created_at', 'desc')->paginate(15)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'cliente_id'               => 'required|exists:clientes,id',
            'tipo_processo_id'         => 'nullable|exists:tipos_processos,id',
            'advogado_responsavel_id'  => 'nullable|exists:users,id',
            'titulo'                   => 'required|string|max:255',
            'numero_processo'          => 'nullable|string|max:255',
            'vara_comarca'             => 'nullable|string|max:255',
            'cidade'                   => 'nullable|string|max:100',
            'estado'                   => 'nullable|string|max:2',
            'status'                   => 'nullable|in:ativo,em_andamento,encerrado,arquivado,suspenso',
            'data_distribuicao'        => 'nullable|date',
            'prazo_principal'          => 'nullable|date',
            'data_proxima_movimentacao'=> 'nullable|date',
            'descricao'                => 'nullable|string',
        ]);

        $processo = Processo::create($data);

        return response()->json($processo->load(['cliente', 'tipoProcesso', 'advogadoResponsavel']), 201);
    }

    public function show(Processo $processo)
    {
        $processo->load([
            'cliente',
            'tipoProcesso',
            'advogadoResponsavel',
            'tarefas',
            'lancamentosFinanceiros',
            'documentosJuridicos',
        ]);

        return response()->json($processo);
    }

    public function update(Request $request, Processo $processo)
    {
        $data = $request->validate([
            'cliente_id'               => 'sometimes|required|exists:clientes,id',
            'tipo_processo_id'         => 'nullable|exists:tipos_processos,id',
            'advogado_responsavel_id'  => 'nullable|exists:users,id',
            'titulo'                   => 'sometimes|required|string|max:255',
            'numero_processo'          => 'nullable|string|max:255',
            'vara_comarca'             => 'nullable|string|max:255',
            'cidade'                   => 'nullable|string|max:100',
            'estado'                   => 'nullable|string|max:2',
            'status'                   => 'nullable|in:ativo,em_andamento,encerrado,arquivado,suspenso',
            'data_distribuicao'        => 'nullable|date',
            'prazo_principal'          => 'nullable|date',
            'data_proxima_movimentacao'=> 'nullable|date',
            'descricao'                => 'nullable|string',
        ]);

        $processo->update($data);

        return response()->json($processo->load(['cliente', 'tipoProcesso', 'advogadoResponsavel']));
    }

    public function destroy(Processo $processo)
    {
        $processo->delete();

        return response()->json(null, 204);
    }
}
