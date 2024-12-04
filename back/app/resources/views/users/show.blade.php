@extends('app')

@section('content')
    <div class="container w-50 border p-4 mt-4">
        <h3>Detalles del Usuario</h3>

        <!-- Formulario para actualizar usuario -->
        <form action="{{ route('users-update', ['id' => $user->id]) }}" method="POST">
            @method('PATCH')
            @csrf

            <div class="mb-3">
                <label for="username" class="form-label">Nombre de Usuario</label>
                <input type="text" class="form-control" name="username" value="{{ old('username', $user->username) }}" required>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" name="email" value="{{ old('email', $user->email) }}" required>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" name="password" placeholder="Deja en blanco si no deseas cambiarla">
            </div>

            <button type="submit" class="btn btn-primary">Actualizar Usuario</button>
        </form>
        <!-- Boton para volver a usuarios -->
        <a href="{{ route('users') }}" class="btn btn-secondary mt-3">Volver a la lista de usuarios</a>
    </div>
@endsection
