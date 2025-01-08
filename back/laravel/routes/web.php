<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PartidaController;

Route::get('/', function () {
    return view('welcome');
});

// CRUD para partidas
Route::resource('partidas', PartidaController::class);
