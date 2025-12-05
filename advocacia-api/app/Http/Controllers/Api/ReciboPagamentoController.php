<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ReciboPagamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReciboPagamentoController extends Controller
{
    public function index(Request $request)
    {
        $query = ReciboPagamento::with(['lancamento', 'usuarioUpload']);

        if ($request->filled('lancamento_id')) {
            $query->where('lancamento_id', $request->lancamento_id);
        }

        return response()->json(
            $query->orderBy('created_at', 'desc')->paginate(15)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'lancamento_id' => 'required|exists:lancamentos_financeiros,id',
            'arquivo'       => 'required|file|max:5120', // até 5 MB
            'uploaded_by'   => 'nullable|exists:users,id',
        ]);

        $file = $request->file('arquivo');

        $recibo = ReciboPagamento::create([
            'lancamento_id' => $data['lancamento_id'],
            'nome_arquivo'  => $file->getClientOriginalName(),
            'mime_type'     => $file->getClientMimeType(),
            'tamanho'       => $file->getSize(),
            'conteudo'      => file_get_contents($file->getRealPath()),
            'uploaded_by'   => $data['uploaded_by'] ?? null,
        ]);

        return response()->json($recibo->load(['lancamento', 'usuarioUpload']), 201);
    }

    public function show(ReciboPagamento $reciboPagamento)
    {
        $reciboPagamento->load(['lancamento', 'usuarioUpload']);

        return response()->json($reciboPagamento);
    }

    public function destroy(ReciboPagamento $reciboPagamento)
    {
        $reciboPagamento->delete();

        return response()->json(null, 204);
    }

    // Opcional: endpoint para download do arquivo
    public function download(ReciboPagamento $reciboPagamento)
    {
        return response($reciboPagamento->conteudo)
            ->header('Content-Type', $reciboPagamento->mime_type)
            ->header('Content-Disposition', 'attachment; filename="'.$reciboPagamento->nome_arquivo.'"');
    }
}
