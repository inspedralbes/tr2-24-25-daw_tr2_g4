<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/usuarios', [UsersController::class, 'index'])->name('users');
Route::post('/usuarios', [UsersController::class, 'store'])->name('users');
Route::get('/usuarios/{id}', [UsersController::class, 'show'])->name('users-show');
Route::patch('/usuarios/{id}', [UsersController::class, 'update'])->name('users-update');
Route::delete('/usuarios/{id}', [UsersController::class, 'destroy'])->name('users-destroy');
