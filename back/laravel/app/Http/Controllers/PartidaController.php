<?php

namespace App\Http\Controllers;

use App\Models\Partida;
use Illuminate\Http\Request;

class PartidaController extends Controller
{
    // Mostrar todas las partidas
    public function index()
    {
        $partidas = Partida::all(); // Obtiene todas las partidas
        return view('partidas.index', compact('partidas'));
    }


        
            public function obtenerPreguntas()
            {
                $partidas = Partida::all();
                return response()->json($partidas);
            }
                    
   

    


    //Formulario para crear nueva partida
    public function create()
    {
        return view('partidas.create');
    }
    

    // Mostrar detalles de una partida
    public function show($id)
    {
        $partida = Partida::find($id);
        if (!$partida) {
            return redirect()->route('partidas.index')->with('error', 'Partida no encontrada');
        }
        return view('partidas.show', compact('partida'));
    }

    // Almacenar nueva partida
    public function store(Request $request)
{
    $request->validate([
        'operacion' => 'required|string',
        'respuesta_correcta' => 'required|integer',
        'respuestaIncorrecta_1' => 'required|integer',
        'respuestaIncorrecta_2' => 'required|integer',
        'respuestaIncorrecta_3' => 'required|integer',
        'nivel' => 'required|string',
        'duracion' => 'required|integer',
    ]);

    Partida::create($request->all()); // Crea la nueva partida

    return redirect()->route('partidas.index')->with('success', 'Partida creada con éxito');
}


    // Mostrar formulario de edición
    public function edit($id)
    {
        $partida = Partida::find($id);
        if (!$partida) {
            return redirect()->route('partidas.index')->with('error', 'Partida no encontrada');
        }
        return view('partidas.edit', compact('partida'));
    }

    // Actualizar partida
    public function update(Request $request, $id)
    {
        $partida = Partida::find($id);
        if (!$partida) {
            return redirect()->route('partidas.index')->with('error', 'Partida no encontrada');
        }

        $request->validate([
            'operacion' => 'string',
            'respuesta_correcta' => 'integer',
            'respuestaIncorrecta_1' => 'integer',
            'respuestaIncorrecta_2' => 'integer',
            'respuestaIncorrecta_3' => 'integer',
            'nivel' => 'string',
            'duracion' => 'integer',
        ]);

        $partida->update($request->all());

        return redirect()->route('partidas.index')->with('success', 'Partida actualizada con éxito');
    }

    // Eliminar partida
    public function destroy($id)
    {
        $partida = Partida::find($id);
        if (!$partida) {
            return redirect()->route('partidas.index')->with('error', 'Partida no encontrada');
        }

        $partida->delete();
        return redirect()->route('partidas.index')->with('success', 'Partida eliminada con éxito');
    }
}
