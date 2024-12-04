<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; // Importa la clase Request
use Illuminate\Support\Facades\Auth; // Importa Auth
use Illuminate\Support\Facades\Hash; // Importa Hash
use App\Models\User; // Importa el modelo User
use Illuminate\Support\Facades\Validator; // Para validación de formularios

class AuthController extends Controller
{
    /**
     * Registro de usuario.
     */
    public function register(Request $request)
    {
        // Usando un validador más flexible para manejar los errores
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // Aseguramos que la contraseña se confirme
        ]);

        // Si la validación falla, respondemos con los errores
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Crear usuario
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Crear el token de acceso
        $token = $user->createToken('auth_token')->plainTextToken;

        // Devolver respuesta con el usuario y el token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Inicio de sesión.
     */
    public function login(Request $request)
    {
        // Validación de las credenciales del usuario
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Si la validación falla, respondemos con los errores
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Verificar si el usuario existe
        $user = User::where('username', $request->username)->first();

        // Si no existe el usuario o la contraseña no coincide
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        // Crear el token de acceso
        $token = $user->createToken('auth_token')->plainTextToken;

        // Devolver respuesta con el mensaje, el usuario y el token
        return response()->json([
            'message' => 'Login exitoso',
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Obtener el usuario autenticado.
     */
    public function user(Request $request)
    {
        // Devuelve la información del usuario autenticado
        return response()->json($request->user());
    }

    /**
     * Cerrar sesión.
     */
    public function logout(Request $request)
    {
        // Eliminar el token de acceso actual
        $request->user()->currentAccessToken()->delete();

        // Devolver mensaje de éxito
        return response()->json(['message' => 'Sesión cerrada']);
    }
}
