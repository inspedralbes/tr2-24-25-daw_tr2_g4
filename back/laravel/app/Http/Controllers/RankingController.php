<?php

namespace App\Http\Controllers;

use App\Models\Ranking;
use Illuminate\Http\Request;

class RankingController extends Controller
{
    public function getRanking()
    {
        $rankings = Ranking::with('user:id,username')
            ->orderBy('puntuacion', 'desc')
            ->get();

        $result = $rankings->map(function ($ranking) {
            return [
                'id' => $ranking->id,
                'username' => $ranking->user ? $ranking->user->username : 'Usuario no encontrado',
                'puntuacion' => $ranking->puntuacion,
                'created_at' => $ranking->created_at,
            ];
        });

        return response()->json($result);
    }
}
