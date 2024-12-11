<!-- resources/views/partidas/edit.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Partida</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

</head>
<body>
    <h1>Editar Partida</h1>

    <form action="{{ route('partidas.update', $partida->id) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="operacion">Operación:</label>
        <input type="text" name="operacion" id="operacion" value="{{ $partida->operacion }}" required><br>

        <label for="respuesta_correcta">Respuesta Correcta:</label>
        <input type="number" name="respuesta_correcta" id="respuesta_correcta" value="{{ $partida->respuesta_correcta }}" required><br>

        <label for="respuestaIncorrecta_1">Respuesta Incorrecta 1:</label>
        <input type="number" name="respuestaIncorrecta_1" id="respuestaIncorrecta_1" value="{{ $partida->respuestaIncorrecta_1 }}" required><br>

        <label for="respuestaIncorrecta_2">Respuesta Incorrecta 2:</label>
        <input type="number" name="respuestaIncorrecta_2" id="respuestaIncorrecta_2" value="{{ $partida->respuestaIncorrecta_2 }}" required><br>

        <label for="respuestaIncorrecta_3">Respuesta Incorrecta 3:</label>
        <input type="number" name="respuestaIncorrecta_3" id="respuestaIncorrecta_3" value="{{ $partida->respuestaIncorrecta_3 }}" required><br>

        <label for="nivel">nivel:</label>
        <input type="text" name="nivel" id="nivel" value="{{ $partida->nivel }}" required><br>

        <label for="duracion">Duración:</label>
        <input type="number" name="duracion" id="duracion" value="{{ $partida->duracion }}" required><br>

        <button type="submit">Actualizar</button>
    </form>

    <a href="{{ route('partidas.index') }}">Volver</a>
</body>
</html>
