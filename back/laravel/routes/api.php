<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\RankingController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/preguntas', [PartidaController::class, 'obtenerPreguntas']);

Route::apiResource('partidas', PartidaController::class)->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'register']); // Registro de usuario
Route::post('login', [AuthController::class, 'login']); // Login de usuario

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/update-profile', [AuthController::class, 'updatePerfil']);
});
Route::middleware('auth:sanctum')->post('/user/cambiar-contra', [AuthController::class, 'cambiarContrasena']); 
