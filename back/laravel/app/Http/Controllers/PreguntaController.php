<?php
namespace App\Http\Controllers;
use App\Models\Partida;

class PreguntaController extends Controller
{
    public function obtenerPreguntasPorNivel($nivel){
        $preguntas = Partida::where('nivel', $nivel)->get();

        if ($nivel == 0) {
            $preguntas = $preguntas->shuffle()->take(20);
        }
        return response()->json($preguntas);
    }
}
