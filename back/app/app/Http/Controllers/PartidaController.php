<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PartidaController extends Controller
{
    public function obtenerPreguntas()
    {
        // Ruta del archivo JSON en la carpeta public
        $filePath = public_path('data.json'); 
        
        if (file_exists($filePath)) {
            $data = json_decode(file_get_contents($filePath), true);
            return response()->json($data, 200);
        }

        return response()->json(['error' => 'Archivo no encontrado'], 404);
    }
}
