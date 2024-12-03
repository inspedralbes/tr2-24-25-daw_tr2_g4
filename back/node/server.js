const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let salas = {};
let nombres = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Nuevo jugador conectado', socket.id);

    socket.on('registrarNombre', (nombre) => {
        nombres[socket.id] = nombre;
        console.log(`Jugador registrado: ${nombre} (${socket.id})`);
        socket.emit('nombreRegistrado', nombre);
    });

    socket.on('crearSala', (codigoSala) => {
        if (!salas[codigoSala]) {
            salas[codigoSala] = { jugadores: [] };
            console.log(`Sala creada: ${codigoSala}`);
            socket.emit('salaCreada', codigoSala); // Confirma la creación de la sala
        } else {
            socket.emit('errorSala', 'El código de sala ya está en uso');
        }
    });

    socket.on('unirseSala', (codigoSala) => {
        if (salas[codigoSala]) {
            salas[codigoSala].jugadores.push(nombres[socket.id]);
            socket.join(codigoSala);
            console.log(`Jugador ${nombres[socket.id]} se unió a la sala ${codigoSala}`);
            io.to(codigoSala).emit('jugadores', salas[codigoSala].jugadores);
        } else {
            socket.emit('errorSala', 'Código de sala inválido');
        }
    });

    socket.on('disconnect', () => {
        console.log(`Jugador desconectado: ${nombres[socket.id]} (${socket.id})`);
        for (let codigoSala in salas) {
            salas[codigoSala].jugadores = salas[codigoSala].jugadores.filter(
                nombre => nombre !== nombres[socket.id]
            );
            io.to(codigoSala).emit('jugadores', salas[codigoSala].jugadores);
        }
        delete nombres[socket.id];
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
