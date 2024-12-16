<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Partidas</title>
    <link rel="stylesheet" href="<?php echo e(asset('css/style.css')); ?>">
</head>
<body>
    <div class="container">
        <h1>Lista de Partidas</h1>

        <!-- Mensajes de éxito o error -->
        <?php if(session('success')): ?>
            <div class="success"><?php echo e(session('success')); ?></div>
        <?php elseif(session('error')): ?>
            <div class="error"><?php echo e(session('error')); ?></div>
        <?php endif; ?>

        <!-- Enlace para crear una nueva partida -->
        <a href="<?php echo e(route('partidas.create')); ?>" class="back-btn">Crear Nueva Partida</a>

        <!-- Tabla con las partidas -->
        <table>
            <thead>
                <tr>
                    <th>Operación</th>
                    <th>Modo</th>
                    <th>Duración</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php $__currentLoopData = $partidas; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $partida): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <tr>
                        <td><?php echo e($partida->operacion); ?></td>
                        <td><?php echo e($partida->modo); ?></td>
                        <td><?php echo e($partida->duracion); ?></td>
                        <td>
                            <a href="<?php echo e(route('partidas.edit', $partida->id)); ?>">Editar</a>
                            <form action="<?php echo e(route('partidas.destroy', $partida->id)); ?>" method="POST" style="display:inline;">
                                <?php echo csrf_field(); ?>
                                <?php echo method_field('DELETE'); ?>
                                <button type="submit">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </tbody>
        </table>
    </div>
</body>
</html>
<?php /**PATH C:\Users\Gabriel\Desktop\project\tr2-24-25-daw_tr2_g4\back\app\resources\views/partidas/index.blade.php ENDPATH**/ ?>