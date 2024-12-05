<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Registro
    public function register(Request $request)
    {
        // Validación
        $data = $request->validate([
            'username' => ['required', 'string', 'unique:users,username'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        // Crear el usuario
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Generar el token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Respuesta con el usuario y el token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Login
    public function login(Request $request)
    {
        // Validación
        $data = $request->validate([
            'username' => ['required', 'string', 'exists:users,username'], // Cambiado a username
            'password' => ['required', 'string', 'min:6'],
        ]);

        // Buscar usuario por username
        $user = User::where('username', $data['username'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Generar el token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Respuesta con el usuario y el token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
