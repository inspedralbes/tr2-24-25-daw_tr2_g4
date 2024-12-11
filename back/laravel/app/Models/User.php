<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'username', 
        'email', 
        'password', 
        'nivel',
        'avatar',
        'personal_access_token', // Incluido para almacenar el token
    ];

    protected $hidden = [
        'password', 
        'remember_token', 
        'personal_access_token', // Ocultar el token en respuestas por defecto
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
