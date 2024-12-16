<!-- resources/views/partidas/create.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Partida</title>
    <link rel="stylesheet" href="<?php echo e(asset('css/style.css')); ?>">

</head>
<body>
    <h1>Crear Partida</h1>

    <form action="<?php echo e(route('partidas.store')); ?>" method="POST">
        <?php echo csrf_field(); ?>
        <label for="operacion">Operación:</label>
        <input type="text" name="operacion" id="operacion" required><br>

        <label for="respuesta_correcta">Respuesta Correcta:</label>
        <input type="number" name="respuesta_correcta" id="respuesta_correcta"  required><br>

        <label for="respuestaIncorrecta_1">Respuesta Incorrecta 1:</label>
        <input type="number" name="respuestaIncorrecta_1" id="respuestaIncorrecta_1" required><br>

        <label for="respuestaIncorrecta_2">Respuesta Incorrecta 2:</label>
        <input type="number" name="respuestaIncorrecta_2" id="respuestaIncorrecta_2" required><br>

        <label for="respuestaIncorrecta_3">Respuesta Incorrecta 3:</label>
        <input type="number" name="respuestaIncorrecta_3" id="respuestaIncorrecta_3" required><br>

        <label for="modo">Modo:</label>
        <input type="text" name="modo" id="modo" required><br>

        <label for="duracion">Duración:</label>
        <input type="number" name="duracion" id="duracion" required><br>

        <button type="submit">Crear</button>
    </form>

    <a href="<?php echo e(route('partidas.index')); ?>">Volver a la lista de partidas</a>
</body>
</html>
<?php /**PATH C:\Users\Gabriel\Desktop\project\tr2-24-25-daw_tr2_g4\back\app\resources\views/partidas/create.blade.php ENDPATH**/ ?>