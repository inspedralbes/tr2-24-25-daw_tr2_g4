@extends('app')

@section('content')
    <div class="container w-50 border p-4 mt-4">
        <h3>Crear Usuario</h3>
        
        <!-- Formulario para crear un nuevo usuario -->
        <form action="{{ route('users') }}" method="POST">
            @csrf
            
            @if (session('success'))
                <h6 class="alert alert-success">{{ session('success') }}</h6>
            @endif
            <!-- errores por falta de datos -->
            @error('username')
            <h6 class="alert alert-danger">{{ $message }}</h6>
            @enderror

            @error('email')
            <h6 class="alert alert-danger">{{ $message }}</h6>
            @enderror

            @error('password')
            <h6 class="alert alert-danger">{{ $message }}</h6>
            @enderror
            <!-- Formulario de Crear Usuario -->
            <div class="mb-3">
                <label for="username" class="form-label">Nombre de Usuario</label>
                <input type="text" class="form-control" name="username" required>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" name="email" required>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" name="password" required>
            </div>

            <button type="submit" class="btn btn-primary">Crear Usuario</button>
        </form>

        <h4 class="mt-4">Lista de Usuarios</h4>

        <div>
            @foreach ($users as $user)
                <div class="row py-1">
                    <div class="col-md-9 d-flex align-items-center">
                        <!-- Enlace que redirige a la página de detalles del usuario -->
                        <a href="{{ route('users-show', ['id' => $user->id]) }}">{{ $user->username }}</a>
                    </div>

                    <div class="col-md-3 d-flex justify-content-end">
                        <!-- Botón para eliminar el usuario -->
                        <form action="{{ route('users-destroy', [$user->id]) }}" method="POST">
                            @method('DELETE')
                            @csrf
                            <button class="btn btn-danger btn-sm">Eliminar</button>
                        </form>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
