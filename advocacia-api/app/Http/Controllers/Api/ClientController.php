<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientStoreRequest;
use App\Http\Requests\ClientUpdateRequest;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $perPage = min(max((int) $request->query('per_page', 15), 1), 50);

        $query = Client::query()->select([
            'id','name','cpf','email','phone','birth_date','created_at'
        ])->orderByDesc('id');

        // busca simples (nome/cpf/email/phone)
        if ($search = trim((string) $request->query('search', ''))) {
            $digits = preg_replace('/\D+/', '', $search);

            $query->where(function ($q) use ($search, $digits) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");

                if ($digits !== '') {
                    $q->orWhere('cpf', 'like', "%{$digits}%")
                      ->orWhere('phone', 'like', "%{$digits}%");
                }
            });
        }

        return response()->json(
            $query->paginate($perPage)
        );
    }

    public function store(ClientStoreRequest $request)
    {
        $client = Client::create($request->validated());

        return response()->json([
            'message' => 'Cliente criado com sucesso.',
            'data' => $client,
        ], 201);
    }

    public function show(int $id)
    {
        $client = Client::findOrFail($id);

        return response()->json([
            'data' => $client,
        ]);
    }

    public function update(ClientUpdateRequest $request, int $id)
    {
        $client = Client::findOrFail($id);
        $client->fill($request->validated());
        $client->save();

        return response()->json([
            'message' => 'Cliente atualizado com sucesso.',
            'data' => $client,
        ]);
    }

    public function destroy(int $id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        return response()->json([
            'message' => 'Cliente removido com sucesso.',
        ]);
    }
}
