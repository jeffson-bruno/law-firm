<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CidadeAtuacao;
use Illuminate\Http\Request;

class CidadeAtuacaoController extends Controller
{
    public function index()
    {
        // Paginação simples, como em /api/clientes
        $cidades = CidadeAtuacao::orderBy('nome')->paginate(50);

        return response()->json($cidades);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome'      => 'required|string|max:255',
            'estado'    => 'nullable|string|max:2',
            'cep_padrao'=> 'nullable|string|max:8',
        ]);

        $cidade = CidadeAtuacao::create($data);

        return response()->json($cidade, 201);
    }

    public function show(CidadeAtuacao $cidades_atuacao)
    {
        return response()->json($cidades_atuacao);
    }

    public function update(Request $request, CidadeAtuacao $cidades_atuacao)
    {
        $data = $request->validate([
            'nome'      => 'sometimes|required|string|max:255',
            'estado'    => 'nullable|string|max:2',
            'cep_padrao'=> 'nullable|string|max:8',
        ]);

        $cidades_atuacao->update($data);

        return response()->json($cidades_atuacao);
    }

    public function destroy(CidadeAtuacao $cidades_atuacao)
    {
        $cidades_atuacao->delete();

        return response()->json(null, 204);
    }
}
