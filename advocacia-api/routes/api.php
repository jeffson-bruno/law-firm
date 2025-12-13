<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;

use App\Http\Controllers\Api\Admin\UserPermissionController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

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
