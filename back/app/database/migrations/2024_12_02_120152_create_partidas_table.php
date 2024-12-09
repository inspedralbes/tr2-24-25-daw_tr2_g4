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
        Schema::create('partidas', function (Blueprint $table) {
            $table->id();
            $table->string('operacion');
            $table->integer('respuesta_correcta'); 
            $table->integer('respuestaIncorrecta_1');
            $table->integer('respuestaIncorrecta_2');
            $table->integer('respuestaIncorrecta_3');
            $table->integer('nivel')->default(1); 
            $table->integer('duracion'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidas');
    }
};
