<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $guarded = [];

    // Ocultar campos sensibles en respuestas JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Conversión de atributos
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
