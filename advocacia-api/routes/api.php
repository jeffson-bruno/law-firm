<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\TipoProcessoController;
use App\Http\Controllers\Api\ProcessoController;
use App\Http\Controllers\Api\LancamentoFinanceiroController;
use App\Http\Controllers\Api\DocumentoJuridicoController;
use App\Http\Controllers\Api\TarefaController;
use App\Http\Controllers\Api\AgendamentoController;
use App\Http\Controllers\Api\NotificacaoController;
use App\Http\Controllers\Api\ReciboPagamentoController;
use App\Http\Controllers\Api\CidadeAtuacaoController;

// Rota de teste simples
Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API do Sistema de Advocacia funcionando.',
    ]);
});

// Rotas públicas de autenticação
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']); // opcional, pode remover depois

// Rotas protegidas por token Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::apiResource('clientes', ClienteController::class);
    Route::apiResource('tipos-processos', TipoProcessoController::class);
    Route::apiResource('processos', ProcessoController::class);
    Route::apiResource('lancamentos-financeiros', LancamentoFinanceiroController::class);
    Route::apiResource('documentos-juridicos', DocumentoJuridicoController::class);
    Route::apiResource('tarefas', TarefaController::class);
    Route::apiResource('agendamentos', AgendamentoController::class);
    Route::apiResource('notificacoes', NotificacaoController::class);
    Route::apiResource('recibos', ReciboPagamentoController::class);

    Route::get('recibos/{reciboPagamento}/download', [ReciboPagamentoController::class, 'download'])
        ->name('recibos.download');
});

Route::apiResource('cidades-atuacao', CidadeAtuacaoController::class);
