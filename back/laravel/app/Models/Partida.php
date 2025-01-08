<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partida extends Model
{
    use HasFactory;

    // Indicar que la tabla usa timestamps (created_at y updated_at)
    public $timestamps = true;

    // Especificar las columnas que pueden ser asignadas masivamente
    protected $fillable = [
        'operacion',
        'respuesta_correcta',
        'respuestaIncorrecta_1',
        'respuestaIncorrecta_2',
        'respuestaIncorrecta_3',
        'nivel',
        'duracion',
    ];

    // Si los timestamps no son automáticos, puedes definirlos aquí (aunque en este caso ya lo está gestionando Laravel)
    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
