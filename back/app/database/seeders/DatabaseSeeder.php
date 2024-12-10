<?php

namespace Database\Seeders;

use App\Models\Partida;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $jsonFilePath = public_path('data.json'); // Asegúrate de la ruta correcta
        $jsonData = File::get($jsonFilePath); // Usar File para obtener el contenido del archivo
        $data = json_decode($jsonData, true); // Decodificar el JSON a un array

        foreach ($data as $key => $producte) {
            Partida::create([
                'id' => $producte['id'],
                'operacion' => $producte['operacion'],
                'respuesta_correcta' => $producte['respuesta_correcta'],
                'respuestaIncorrecta_1' => $producte['respuestaIncorrecta_1'],
                'respuestaIncorrecta_2' => $producte['respuestaIncorrecta_2'],
                'respuestaIncorrecta_3' => $producte['respuestaIncorrecta_3'],
                'nivel' => $producte['nivel'],
                'duracion' => $producte['duracion'],
            ]);
        }



      

         
    }
}
