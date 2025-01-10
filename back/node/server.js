const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');  

const app = express();

app.use(cors({
    origin: "*",  
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true  
}));

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",  
        methods: ["GET", "POST"],
        credentials: true  
    }
});

io.on('connection', async (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    const token = socket.handshake.auth.token;

    if (!token) {
        console.log('Token no proporcionado. Desconectando socket.');
        socket.disconnect();
        return;
    }

    try {
        const response = await axios.get('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        socket.user = response.data;
        console.log('Usuario autenticado:', socket.user); // Confirmar las propiedades que llegan
    } catch (error) {
        console.error('Token inválido:', error.response?.data || error.message);
        socket.disconnect();
        return;
    }

    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5); 
        socket.join(claveSala);
        socket.emit('room-created', claveSala);
        console.log(`Sala creada: ${claveSala} por el usuario: ${socket.user.username} (ID=${socket.user.id})`);

        io.to(claveSala).emit('room-users', {
            room: claveSala,
            users: [...io.sockets.adapter.rooms.get(claveSala)].map(id => ({
                id,
                username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
            })),
        });
    });

    socket.on('join-room', (claveSala) => {
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            socket.join(claveSala);
            console.log(`Usuario ${socket.user.username} (ID=${socket.user.id}) se unió a la sala: ${claveSala}`);

            socket.emit('room-joined', claveSala);

            io.to(claveSala).emit('room-users', {
                room: claveSala,
                users: [...room].map(id => ({
                    id,
                    username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                }))
            });
        } else {
            console.log(`Intento de unión a sala inexistente: ${claveSala}`);
            socket.emit('error', 'Sala no encontrada');
        }
    });

    socket.on('leave-room', (claveSala) => {
        socket.leave(claveSala);
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            io.to(claveSala).emit('room-users', {
                room: claveSala,
                users: [...room].map(id => ({
                    id,
                    username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                }))
            });
        }
        socket.emit('left-room');
    });

    socket.on('disconnecting', () => {
        for (const claveSala of socket.rooms) {
            if (claveSala !== socket.id) {
                const room = io.sockets.adapter.rooms.get(claveSala);
                if (room) {
                    const usersActualizados = [...room].filter((id) => id !== socket.id);
                    io.to(claveSala).emit('room-users', {
                        room: claveSala,
                        users: usersActualizados.map(id => ({
                            id,
                            username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                        }))
                    });
                }
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
    });
});

const PORT = 3100;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
