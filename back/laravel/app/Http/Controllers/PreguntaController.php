<?php

namespace App\Http\Controllers;

use App\Models\Partida;

class PreguntaController extends Controller
{
    public function obtenerPreguntasPorNivel($nivel)
    {
        try {
            $pregunta = Partida::where('nivel', $nivel)->first(); 

            if (!$pregunta) {
                return response()->json(['message' => 'No hay preguntas para este nivel.'], 404);
            }

            return response()->json($pregunta);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
