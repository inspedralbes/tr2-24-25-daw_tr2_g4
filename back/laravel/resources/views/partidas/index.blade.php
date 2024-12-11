<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Partidas</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    <div class="container">
        <h1>Lista de Partidas</h1>

        <!-- Mensajes de éxito o error -->
        @if (session('success'))
            <div class="success">{{ session('success') }}</div>
        @elseif (session('error'))
            <div class="error">{{ session('error') }}</div>
        @endif

        <!-- Enlace para crear una nueva partida -->
        <a href="{{ route('partidas.create') }}" class="back-btn">Crear Nueva Partida</a>

        <!-- Tabla con las partidas -->
        <table>
            <thead>
                <tr>
                    <th>Operación</th>
                    <th>nivel</th>
                    <th>Duración</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($partidas as $partida)
                    <tr>
                        <td>{{ $partida->operacion }}</td>
                        <td>{{ $partida->nivel }}</td>
                        <td>{{ $partida->duracion }}</td>
                        <td>
                            <a href="{{ route('partidas.edit', $partida->id) }}">Editar</a>
                            <form action="{{ route('partidas.destroy', $partida->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
