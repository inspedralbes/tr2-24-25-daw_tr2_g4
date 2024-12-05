<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\AuthController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/preguntas', [PartidaController::class, 'obtenerPreguntas']);
Route::apiResource('partidas', PartidaController::class);

// Rutas para el CRUD de partidas
Route::get('/partidas', [PartidaController::class, 'index']); // Listar todas las partidas
Route::get('/partidas/{id}', [PartidaController::class, 'show']); // Obtener partida por ID
Route::post('/partidas', [PartidaController::class, 'store']); // Crear nueva partida
Route::patch('/partidas/{id}', [PartidaController::class, 'update']); // Actualizar partida con PATCH
Route::delete('/partidas/{id}', [PartidaController::class, 'destroy']); // Eliminar partida

// Rutas para el registro y login de usuarios

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




