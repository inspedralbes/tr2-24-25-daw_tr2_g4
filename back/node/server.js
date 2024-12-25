const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');  

const app = express();

const salas={};
let conexiones = {};
let Preguntas=[]
rellenarPreguntas();

async function rellenarPreguntas(){
    const URL = `http://localhost:8000/api/preguntas/nivel/0`;
    const response = await fetch(URL);
    Preguntas=await response.json();


 }




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

    socket.on('poder',(poder,sala,username)=>{
        const index=obtenerIndex(username,sala)
        if(salas[sala][index+1]){
            salas[sala][index+1].puntacion--;
            if(salas[sala][index+1].puntacion<0){
                salas[sala][index+1].puntacion=0;
            }
            conexiones[salas[sala][index+1].socketId].emit('tedio',username) 
            emitirRanking(sala);
        
        }
       
      
        

    })

    socket.on('empezar',(sala)=>{
       
        io.to(sala).emit('pregunta', Preguntas[0]); 
       
        emitirRanking(sala)
    });

    function obtenerIndex(username,sala) {
       
        const index = salas[sala].findIndex(user => user.username === username);
        return index
      }
    

    function emitirRanking(sala){
        salas[sala].sort((a, b) => b.puntacion - a.puntacion);
        io.to(sala).emit('ranking', salas[sala]); 
    }

    socket.on('cambio_pregunta',(username,sala,tiro)=>{
        const index= obtenerIndex(username,sala)  
       
        let aux=salas[sala][index].index;
      //  if(tiro==Preguntas[0].respuesta_correcta){
        //    salas[sala][index].puntacion++;
       // }
        
       salas[sala][index].puntacion=salas[sala][index].puntacion+tiro;

        salas[sala][index].index++;
        aux=salas[sala][index].index;
        socket.emit('pregunta',Preguntas[aux])
        if (aux>18){
            rellenarPreguntas();
            salas[sala][index].index=0;
        }
        
        emitirRanking(sala);
    })

    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5); 
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
       
        socket.user.puntacion=0;
        socket.user.index=0;
        socket.user.socketId=socket.id; 
        salas[claveSala].push(socket.user);
        conexiones[socket.id]=socket
        
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



    socket.on('tiro',()=>{

        console.log(salas)
    })

    socket.on('pami',()=>{

        socket.emit('adios')
    })

    socket.on('patodos', (datoss)=>{

        io.to(datoss).emit('todos');

    })

    socket.on('datos',(salita)=>{




    })

    socket.on('join-room', (claveSala) => {
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
         
        if (room) {
            socket.join(claveSala);
            console.log(`Usuario ${socket.user.username} (ID=${socket.user.id}) se unió a la sala: ${claveSala}`);

            socket.emit('room-joined', claveSala);
            socket.user.puntacion=0;
            socket.user.index=0; 
            socket.user.socketId=socket.id; 
            salas[claveSala].push(socket.user);
            conexiones[socket.id]=socket

            console.log(salas)
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
        salas[claveSala].splice(salas[claveSala].indexOf(socket.user), 1);
        if(salas[claveSala].length===0){

            delete salas[claveSala];
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
        delete conexiones[socket.id]
        console.log(conexiones);
        
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
