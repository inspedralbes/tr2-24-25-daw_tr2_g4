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
        // Validación de los datos de entrada
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Crear el usuario
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    
        // Generar y guardar un token único
        $token = $user->createToken('auth_token')->plainTextToken;

        // Responder con los datos del usuario y el token
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // Login de usuario
    public function login(Request $request)
    {
        // Validación de los datos de entrada
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Buscar el usuario por username
        $user = User::where('username', $request->username)->first();

        // Verificar las credenciales
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        // Crear el token de acceso
        $token = $user->createToken('auth_token')->plainTextToken;

        // Responder con los datos del usuario y el token
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    // Obtener los detalles del usuario autenticado
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
