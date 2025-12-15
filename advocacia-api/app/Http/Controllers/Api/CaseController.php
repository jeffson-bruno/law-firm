<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CaseStoreRequest;
use App\Http\Requests\CaseUpdateRequest;
use App\Models\CaseModel;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class CaseController extends Controller
{
    public function index(Request $request)
    {
        $perPage = min(max((int) $request->query('per_page', 15), 1), 50);

        $query = CaseModel::query()
            ->select(['id','client_id','title','case_number','status','created_at'])
            ->with(['client:id,name,cpf'])
            ->orderByDesc('id');

        if ($clientId = $request->query('client_id')) {
            $query->where('client_id', (int) $clientId);
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = trim((string) $request->query('search', ''))) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('case_number', 'like', "%{$search}%");
            });
        }

        return response()->json($query->paginate($perPage));
    }

    public function store(CaseStoreRequest $request)
    {
        try {
            $case = CaseModel::create([
                ...$request->validated(),
                'status' => $request->validated()['status'] ?? 'ativo',
            ]);

            return response()->json([
                'message' => 'Processo criado com sucesso.',
                'data' => $case,
            ], 201);
        } catch (QueryException $e) {
            // erro de unique (client_id + case_number)
            return response()->json([
                'message' => 'Não foi possível criar o processo.',
                'errors' => [
                    'case_number' => ['Já existe um processo com esse número para este cliente.'],
                ],
            ], 422);
        }
    }

    public function show(int $id)
    {
        $case = CaseModel::with(['client:id,name,cpf,email,phone'])->findOrFail($id);

        return response()->json(['data' => $case]);
    }

    public function update(CaseUpdateRequest $request, int $id)
    {
        $case = CaseModel::findOrFail($id);

        try {
            $case->fill($request->validated());
            $case->save();

            return response()->json([
                'message' => 'Processo atualizado com sucesso.',
                'data' => $case,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Não foi possível atualizar o processo.',
                'errors' => [
                    'case_number' => ['Já existe um processo com esse número para este cliente.'],
                ],
            ], 422);
        }
    }

    public function destroy(int $id)
    {
        $case = CaseModel::findOrFail($id);
        $case->delete();

        return response()->json(['message' => 'Processo removido com sucesso.']);
    }
}
