<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TipoProcesso;
use Illuminate\Http\Request;

class TipoProcessoController extends Controller
{
    public function index()
    {
        return response()->json(
            TipoProcesso::orderBy('nome')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome'      => 'required|string|max:255',
            'area'      => 'nullable|string|max:255',
            'descricao' => 'nullable|string',
            'ativo'     => 'boolean',
        ]);

        $tipo = TipoProcesso::create($data);

        return response()->json($tipo, 201);
    }

    public function show(TipoProcesso $tipoProcesso)
    {
        return response()->json($tipoProcesso);
    }

    public function update(Request $request, TipoProcesso $tipoProcesso)
    {
        $data = $request->validate([
            'nome'      => 'sometimes|required|string|max:255',
            'area'      => 'nullable|string|max:255',
            'descricao' => 'nullable|string',
            'ativo'     => 'boolean',
        ]);

        $tipoProcesso->update($data);

        return response()->json($tipoProcesso);
    }

    public function destroy(TipoProcesso $tipoProcesso)
    {
        $tipoProcesso->delete();

        return response()->json(null, 204);
    }
}
