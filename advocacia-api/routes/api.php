<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;

use App\Http\Controllers\Api\Admin\UserPermissionController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CaseController;
use App\Http\Controllers\Api\CaseDeadlineController;
use App\Http\Controllers\Api\DashboardController;

Route::prefix('auth')->group(function () {
    
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

});

Route::middleware(['auth:sanctum', 'finance.access'])->get('/finance/ping', function () {
    return response()->json(['ok' => true, 'module' => 'finance']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::patch('/users/{id}/finance-access', [UserPermissionController::class, 'updateFinanceAccess']);
});

Route::middleware(['auth:sanctum', 'role:admin,advogado,recepcao'])->group(function () {
    Route::get('/clients', [ClientController::class, 'index']);
    Route::post('/clients', [ClientController::class, 'store']);
    Route::get('/clients/{id}', [ClientController::class, 'show']);
    Route::put('/clients/{id}', [ClientController::class, 'update']);
    Route::delete('/clients/{id}', [ClientController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'role:admin,advogado,recepcao'])->group(function () {
    Route::get('/cases', [CaseController::class, 'index']);
    Route::post('/cases', [CaseController::class, 'store']);
    Route::get('/cases/{id}', [CaseController::class, 'show']);
    Route::put('/cases/{id}', [CaseController::class, 'update']);
    Route::delete('/cases/{id}', [CaseController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'role:admin,advogado,recepcao'])->group(function () {
    Route::get('/case-deadlines', [CaseDeadlineController::class, 'index']);
    Route::post('/case-deadlines', [CaseDeadlineController::class, 'store']);
    Route::get('/case-deadlines/{id}', [CaseDeadlineController::class, 'show']);
    Route::put('/case-deadlines/{id}', [CaseDeadlineController::class, 'update']);
    Route::delete('/case-deadlines/{id}', [CaseDeadlineController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'role:admin,advogado,recepcao'])->prefix('dashboard')->group(function () {
    Route::get('/deadlines-week', [DashboardController::class, 'deadlinesWeek']);
});