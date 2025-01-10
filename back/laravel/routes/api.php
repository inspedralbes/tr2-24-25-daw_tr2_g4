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

Route::get('/preguntas/nivel/{nivel}', [PreguntaController::class, 'obtenerPreguntasPorNivel']);

Route::post('/ranking', [RankingController::class, 'store']);
Route::get('/ranking', [RankingController::class, 'getRanking']);

Route::post('nivel', [AuthController::class, 'nivel']); 
