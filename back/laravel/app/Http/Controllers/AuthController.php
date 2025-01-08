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


    public function updatePerfil(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'sometimes|string|max:255|unique:users,username,' . $request->user()->id,
            'email' => 'sometimes|email|max:255|unique:users,email,' . $request->user()->id,
            'avatar' => 'sometimes|nullable|integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $user = $request->user();
        $user->update($request->only(['username', 'email', 'avatar']));
    
        return response()->json([
            'message' => 'Perfil actualizado correctamente.',
            'user' => $user,
        ]);
    }

    
    public function cambiarContrasena(Request $request) 
{
    $validador = Validator::make($request->all(), [ 
        'contrasena_actual' => 'required', 
        'nueva_contrasena' => 'required|min:6', 
    ]);

    if ($validador->fails()) { 
        return response()->json(['errores' => $validador->errors()], 422); 
    }

    $usuario = $request->user(); 

    if (!Hash::check($request->contrasena_actual, $usuario->password)) { 
        return response()->json(['mensaje' => 'La contraseña actual es incorrecta.'], 403); 
    }

    $usuario->update(['password' => Hash::make($request->nueva_contrasena)]); 

    return response()->json(['mensaje' => 'Contraseña actualizada correctamente.'], 200); 
}


}