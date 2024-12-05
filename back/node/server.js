const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));



io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    //CREAR
    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5); // Clave de sala de 5 caracteres
        socket.join(claveSala);
        socket.emit('room-created', claveSala);
        io.to(claveSala).emit('room-users', { room: claveSala, users: [socket.id] });
    });
    //UNIR
    socket.on('join-room', (claveSala) => {
        //io.sockets.adapter.rooms.get(clave) busca una room con mi clave
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            socket.join(claveSala);
            socket.emit('room-joined', claveSala);
            //emite a esa room lista actualizada
            io.to(claveSala).emit('room-users', { room: claveSala, users: [...room] });
        } else {
            socket.emit('error', 'Sala no encontrada');
        }
    });

    socket.on('leave-room', (claveSala) => {
        socket.leave(claveSala);
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            io.to(claveSala).emit('room-users', { room: claveSala, users: [...room] });
        }
        socket.emit('left-room');
    });

    socket.on('disconnecting', () => {
        for (const claveSala of socket.rooms) {
            if (claveSala !== socket.id) {
                const room = io.sockets.adapter.rooms.get(claveSala);
                if (room) {
                    const usersActualizados = [...room].filter((id) => id !== socket.id);
                    io.to(claveSala).emit('room-users', { room: claveSala, users: usersActualizados });
                }
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
