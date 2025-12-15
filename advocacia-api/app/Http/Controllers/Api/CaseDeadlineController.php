<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CaseDeadlineStoreRequest;
use App\Http\Requests\CaseDeadlineUpdateRequest;
use App\Models\CaseDeadline;
use Illuminate\Http\Request;

class CaseDeadlineController extends Controller
{
    public function index(Request $request)
    {
        $perPage = min(max((int) $request->query('per_page', 15), 1), 50);

        $query = CaseDeadline::query()
            ->select(['id','case_id','title','due_date','status','created_at'])
            ->orderBy('due_date')
            ->orderByDesc('id');

        if ($caseId = $request->query('case_id')) {
            $query->where('case_id', (int) $caseId);
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($from = $request->query('from')) {
            $query->whereDate('due_date', '>=', $from);
        }

        if ($to = $request->query('to')) {
            $query->whereDate('due_date', '<=', $to);
        }

        return response()->json($query->paginate($perPage));
    }

    public function store(CaseDeadlineStoreRequest $request)
    {
        $data = $request->validated();
        $data['status'] = $data['status'] ?? 'pendente';

        $deadline = CaseDeadline::create($data);

        return response()->json([
            'message' => 'Prazo criado com sucesso.',
            'data' => $deadline,
        ], 201);
    }

    public function show(int $id)
    {
        $deadline = CaseDeadline::findOrFail($id);

        return response()->json(['data' => $deadline]);
    }

    public function update(CaseDeadlineUpdateRequest $request, int $id)
    {
        $deadline = CaseDeadline::findOrFail($id);
        $deadline->fill($request->validated());
        $deadline->save();

        return response()->json([
            'message' => 'Prazo atualizado com sucesso.',
            'data' => $deadline,
        ]);
    }

    public function destroy(int $id)
    {
        $deadline = CaseDeadline::findOrFail($id);
        $deadline->delete();

        return response()->json(['message' => 'Prazo removido com sucesso.']);
    }
}
