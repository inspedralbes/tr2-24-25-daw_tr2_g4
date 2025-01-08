<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->foreignId('admin')->constrained('partidas')->onDelete('cascade'); 
            $table->foreignId('invitado')->constrained('partidas')->onDelete('cascade'); 
            $table->foreignId('id_bioma')->constrained('biomas')->onDelete('cascade'); 
            $table->integer('puntaje_admin');
            $table->integer('puntaje_invitado');  
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
