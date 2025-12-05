<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\TipoProcessoController;
use App\Http\Controllers\Api\ProcessoController;
use App\Http\Controllers\Api\LancamentoFinanceiroController;
use App\Http\Controllers\Api\DocumentoJuridicoController;
use App\Http\Controllers\Api\TarefaController;
use App\Http\Controllers\Api\AgendamentoController;
use App\Http\Controllers\Api\NotificacaoController;
use App\Http\Controllers\Api\ReciboPagamentoController;

// Rota de teste simples (opcional)
Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API do Sistema de Advocacia funcionando.',
    ]);
});

// 👉 Aqui, por enquanto, tudo está PÚBLICO.
// Depois que implementarmos autenticação (Sanctum/JWT),
// podemos envolver estas rotas em um grupo com middleware auth:sanctum.

Route::apiResource('clientes', ClienteController::class);
Route::apiResource('tipos-processos', TipoProcessoController::class);
Route::apiResource('processos', ProcessoController::class);
Route::apiResource('lancamentos-financeiros', LancamentoFinanceiroController::class);
Route::apiResource('documentos-juridicos', DocumentoJuridicoController::class);
Route::apiResource('tarefas', TarefaController::class);
Route::apiResource('agendamentos', AgendamentoController::class);
Route::apiResource('notificacoes', NotificacaoController::class);
Route::apiResource('recibos', ReciboPagamentoController::class);

// Rota extra para download do recibo (BLOB)
Route::get('recibos/{reciboPagamento}/download', [ReciboPagamentoController::class, 'download'])
    ->name('recibos.download');
