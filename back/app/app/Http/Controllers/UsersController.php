<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    // Método para mostrar la lista de usuarios
    public function index()
    {
        $users = User::all();  
        return view('users.index', compact('users'));
    }

    // Método para almacenar un nuevo usuario
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $user = new User;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return redirect()->route('users')->with('success', 'Usuario creado correctamente');
    }

    // Método para mostrar los detalles de un usuario
    public function show($id)
    {
        $user = User::findOrFail($id);
        return view('users.show', compact('user'));
    }

    // Método para actualizar un usuario
    public function update(Request $request, $id)
    {
        $request->validate([
            'username' => 'required|min:3',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|min:6',
        ]);

        $user = User::findOrFail($id);
        $user->username = $request->username;
        $user->email = $request->email;
        
        // Si se proporciona una nueva contraseña
        if ($request->password) {
            $user->password = bcrypt($request->password);
        }
        
        $user->save();

        return redirect()->route('users')->with('success', 'Usuario actualizado correctamente');
    }

    // Método para eliminar un usuario
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users')->with('success', 'Usuario eliminado correctamente');
    }

    
}
