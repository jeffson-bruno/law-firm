<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DocumentoJuridico;
use Illuminate\Http\Request;

class DocumentoJuridicoController extends Controller
{
    public function index(Request $request)
    {
        $query = DocumentoJuridico::with(['processo', 'cliente', 'geradoPor']);

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo); // peticao, contrato_honorarios, etc.
        }

        if ($request->filled('processo_id')) {
            $query->where('processo_id', $request->processo_id);
        }

        if ($request->filled('cliente_id')) {
            $query->where('cliente_id', $request->cliente_id);
        }

        return response()->json(
            $query->orderBy('created_at', 'desc')->paginate(15)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tipo'          => 'required|in:peticao,contrato_honorarios,outro',
            'titulo'        => 'required|string|max:255',
            'processo_id'   => 'nullable|exists:processos,id',
            'cliente_id'    => 'nullable|exists:clientes,id',
            'conteudo'      => 'required|string',
            'gerado_por_id' => 'nullable|exists:users,id',
            'gerado_em'     => 'nullable|date',
        ]);

        $documento = DocumentoJuridico::create($data);

        return response()->json($documento->load(['processo', 'cliente', 'geradoPor']), 201);
    }

    public function show(DocumentoJuridico $documentoJuridico)
    {
        $documentoJuridico->load(['processo', 'cliente', 'geradoPor']);

        return response()->json($documentoJuridico);
    }

    public function update(Request $request, DocumentoJuridico $documentoJuridico)
    {
        $data = $request->validate([
            'tipo'          => 'sometimes|required|in:peticao,contrato_honorarios,outro',
            'titulo'        => 'sometimes|required|string|max:255',
            'processo_id'   => 'nullable|exists:processos,id',
            'cliente_id'    => 'nullable|exists:clientes,id',
            'conteudo'      => 'nullable|string',
            'gerado_por_id' => 'nullable|exists:users,id',
            'gerado_em'     => 'nullable|date',
        ]);

        $documentoJuridico->update($data);

        return response()->json($documentoJuridico->load(['processo', 'cliente', 'geradoPor']));
    }

    public function destroy(DocumentoJuridico $documentoJuridico)
    {
        $documentoJuridico->delete();

        return response()->json(null, 204);
    }
}
