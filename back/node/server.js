const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Inicializa Express
const app = express();

// Habilita CORS
app.use(cors({
    origin: "*",  // Permitir todos los orígenes
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true  // Permitir el envío de cookies y credenciales
}));

// Crea el servidor HTTP
const server = http.createServer(app);

// Configura Socket.IO
const io = socketIo(server, {
    cors: {
        origin: "*",  // Permitir todos los orígenes
        methods: ["GET", "POST"],
        credentials: true  // Permitir el envío de cookies y credenciales
    }
});

io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // CREAR
    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5); // Clave de sala de 5 caracteres
        socket.join(claveSala);
        socket.emit('room-created', claveSala);
        io.to(claveSala).emit('room-users', { room: claveSala, users: [socket.id] });
    });

    // UNIR
    socket.on('join-room', (claveSala) => {
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            socket.join(claveSala);
            socket.emit('room-joined', claveSala);
            io.to(claveSala).emit('room-users', { room: claveSala, users: [...room] });
        } else {
            socket.emit('error', 'Sala no encontrada');
        }
    });

    // SALIR
    socket.on('leave-room', (claveSala) => {
        socket.leave(claveSala);
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            io.to(claveSala).emit('room-users', { room: claveSala, users: [...room] });
        }
        socket.emit('left-room');
    });

    // Manejar la desconexión
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
