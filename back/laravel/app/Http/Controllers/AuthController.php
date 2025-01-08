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
            
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Crear el usuario
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'avatar' => $request->avatar,
            'password' => Hash::make($request->password),
        ]);

        // Generar un token único y guardarlo en el usuario
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->update(['personal_access_token' => $token]);
        $user = User::where('username', $request->username)->first();
        // Respuesta con el usuario y el token
        return response()->json([
            'user' => [
            'id_user' => $user->id,         
            'username' => $user->username, 
            'email' => $user->email,      
            'avatar' => $user->avatar,      
        ],
        'token' => $token,
            ],201);
    }

    // Login de usuario
    public function login(Request $request)
    {

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        if (!$user->personal_access_token) {
            $token = $user->createToken('auth_token')->plainTextToken;
            $user->update(['personal_access_token' => $token]);
        } else {
            $token = $user->personal_access_token;
        }

        return response()->json([
        'user' => [
        'id_user' => $user->id,         
        'username' => $user->username, 
        'email' => $user->email,        
        'avatar' => $user->avatar,      
    ],
    'token' => $token,
        ],201);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
