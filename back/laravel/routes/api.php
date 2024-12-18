<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\AuthController;

// Rutas para obtener el usuario autenticado
// Esta ruta está protegida por el middleware 'auth:sanctum' para que solo usuarios autenticados puedan acceder a ella
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Ruta para obtener las preguntas (puede ser pública)
Route::get('/preguntas', [PartidaController::class, 'obtenerPreguntas']);

// CRUD de partidas: Aquí puede que quieras protegerlas si solo los usuarios autenticados deberían acceder a ellas
Route::apiResource('partidas', PartidaController::class)->middleware('auth:sanctum');

// Rutas para el registro y login de usuarios
Route::post('register', [AuthController::class, 'register']); // Registro de usuario
Route::post('login', [AuthController::class, 'login']); // Login de usuario

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/update-profile', [AuthController::class, 'updateProfile']);
});