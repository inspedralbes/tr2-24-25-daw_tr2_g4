const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');  // Para hacer peticiones HTTP a Laravel

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

// Maneja las conexiones de los sockets
io.on('connection', async (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Obtén el token del handshake (proceso de conexión)
    const token = socket.handshake.auth.token;

    if (!token) {
        socket.disconnect(); // Desconecta si no hay token
        return;
    }

    try {
        // Valida el token con Laravel (la ruta debe ser la que tú configures)
        const response = await axios.get('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,  // Envío el token como Bearer
            },
        });

        // Si el token es válido, se guarda el usuario autenticado en el socket
        socket.user = response.data;  // Datos del usuario autenticado
        console.log(`Usuario autenticado: ${socket.user.name}`);

    } catch (error) {
        console.error('Token inválido:', error.response?.data || error.message);
        socket.disconnect(); // Desconecta si el token es inválido
        return;
    }

    // Evento para crear una sala
    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5);  // Clave de sala generada
        socket.join(claveSala);

        // Emitir la lista de usuarios en la sala (incluyendo los datos del usuario)
        io.to(claveSala).emit('room-users', {
            room: claveSala,
            users: [...io.sockets.adapter.rooms.get(claveSala)].map(id => ({
                id,
                username: io.sockets.sockets.get(id)?.user?.name || 'Invitado'
            }))
        });
    });

    // Evento para unirse a una sala
    socket.on('join-room', (claveSala) => {
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            socket.join(claveSala);
            socket.emit('room-joined', claveSala);

            io.to(claveSala).emit('room-users', {
                room: claveSala,
                users: [...room].map(id => ({
                    id,
                    username: io.sockets.sockets.get(id)?.user?.name || 'Invitado'
                }))
            });
        } else {
            socket.emit('error', 'Sala no encontrada');
        }
    });

    // Evento para salir de una sala
    socket.on('leave-room', (claveSala) => {
        socket.leave(claveSala);
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            io.to(claveSala).emit('room-users', { room: claveSala, users: [...room] });
        }
        socket.emit('left-room');
    });

    // Manejo de desconexión
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

// Inicia el servidor en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
