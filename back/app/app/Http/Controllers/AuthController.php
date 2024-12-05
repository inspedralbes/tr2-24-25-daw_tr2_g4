<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Registro de usuario
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
    
        // Generar y guardar un token único
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->update(['personal_access_token' => $token]);
    
        // Respuesta con el usuario y el token
        return response()->json([
            'user' => $user,
        ]);
    }
    
    // Login de usuario
    public function login(Request $request)
    {
        // Validación
        $data = $request->validate([
            'username' => ['required', 'string', 'exists:users,username'],
            'password' => ['required', 'string', 'min:6'],
        ]);
    
        // Buscar usuario por username
        $user = User::where('username', $data['username'])->first();
    
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response([
                'message' => 'Invalid credentials'
            ], 401);
        }
    
        // Reutilizar el token único
        $token = $user->personal_access_token;
    
        return response()->json([
            'user' => $user,
        ]);
    }
    
    // Obtener los detalles del usuario autenticado
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
