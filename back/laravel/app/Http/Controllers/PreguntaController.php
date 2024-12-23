<?php

namespace App\Http\Controllers;

use App\Models\Partida;

class PreguntaController extends Controller
{
    public function obtenerPreguntasPorNivel($nivel)
    {
        try {
            // Se obtiene solo la primera pregunta del nivel solicitado
            $pregunta = Partida::where('nivel', $nivel)->first(); // 'first()' devuelve solo la primera coincidencia

            // Verifica si no se encontró ninguna pregunta para el nivel solicitado
            if (!$pregunta) {
                return response()->json(['message' => 'No questions found for this level'], 404);
            }

            // Retorna la primera pregunta en formato JSON
            return response()->json($pregunta);
        } catch (\Exception $e) {
            // Maneja cualquier error que ocurra durante la ejecución
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
