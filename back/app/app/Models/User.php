<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    // Los atributos que son asignables de forma masiva
    protected $fillable = [
        'username', 'email', 'password',
    ];

    // Los atributos que deben ser ocultos para los arreglos
    protected $hidden = [
        'password', 'remember_token',
    ];

    // Los atributos que deben ser convertidos a tipos de datos nativos
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
