<?php

namespace App\Http\Controllers;

use App\Models\Ranking;
use Illuminate\Http\Request;

class RankingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_users' => 'required|exists:users,id',
            'puntuacion' => 'required|numeric',
        ]);

        $ranking = new Ranking();
        $ranking->id_users = $validated['id_users'];
        $ranking->puntuacion = $validated['puntuacion'];
        $ranking->save();

        return response()->json(['message' => 'Puntuación guardada con éxito'], 201);
    }

    public function getRanking()
    {
        $rankings = Ranking::with('user:id,username')
            ->orderBy('puntuacion', 'desc')  
            ->take(5)
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
