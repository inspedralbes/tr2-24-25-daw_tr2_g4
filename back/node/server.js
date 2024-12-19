const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');  

const app = express();

const salas={};



const Preguntas=[{
    "id": 1,
    "operacion": "5 + 3",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 15
  },
  {
    "id": 2,
    "operacion": "2 + 6",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 7,
    "respuestaIncorrecta_2": 9,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 9
  },
  {
    "id": 3,
    "operacion": "7 + 1",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 10,
    "respuestaIncorrecta_3": 11,
    "nivel": 1,
    "duracion": 20
  },
  {
    "id": 4,
    "operacion": "15 + 12",
    "respuesta_correcta": 27,
    "respuestaIncorrecta_1": 26,
    "respuestaIncorrecta_2": 28,
    "respuestaIncorrecta_3": 25,
    "nivel": 2,
    "duracion": 22
  }


]


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
        const response = await axios.get('http://localhost:8001/api/user', {
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



    socket.on('empezar',(sala)=>{

        io.to(sala).emit('pregunta', Preguntas[0] );
            
        salas[sala].forEach(element => {
            
        });



        console.log(salas)

    });

    function obtenerIndex(username,sala) {
       
        const index = salas[sala].findIndex(user => user.username === username);
        return index
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
        console.log(salas[sala][index].puntacion)

        
        
    })

    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5); 
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
        socket.user.puntacion=0;
        socket.user.index=0;
        salas[claveSala].push(socket.user);
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
            salas[claveSala].push(socket.user);

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
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
