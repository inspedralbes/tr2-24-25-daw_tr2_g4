const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');  
const { log } = require('console');

const app = express();

const salas={};
let conexiones = {};
let Preguntas=[];

let poderes=[
    {
        poder:"banana",
        num: 1,
        direccion: -1,
    },
    {
        poder:"caparazon_verde",
        num: 2,
        direccion:-1
    },
    {   
        poder:"caparazon_rojo",
        num: 3,
        direccion:1
    },
    {   
        poder:"honguito",
        num:3,
        direccion:0

    },
    {   
        poder:"bomba",
        num: 5,
        direccion:2
    },
    {   
        poder:"estrella",
        num:8,
        direccion:2
    },
    {   
        poder:"caparazon_azul",
        num:7,
        direccion:2
    },
    {   
        poder:"rayo",
        num:5,
        direccion:2
    },
    {   
        poder:"bill_bala",
        num:10,
        direccion:2
    }




]

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



    function comprobarCero(datas,sala){

        if (salas[sala][datas].puntacion<0) {
            salas[sala][datas].puntacion=0;
        }

    }

    socket.on('poder',(poder,sala,username)=>{
        let index=obtenerIndex(username,sala)
       
        
        switch (poder.direccion) {
            case 1:
                
                if(salas[sala][index-1]){
                    salas[sala][index-1].puntacion-=poder.num;
                    comprobarCero(index-1,sala)
                    conexiones[salas[sala][index-1].socketId].emit('tedio',username,poder) 
                }

            
                break;
            case -1:
                if(salas[sala][index+1]){
                    salas[sala][index+1].puntacion-=poder.num;
                    comprobarCero(index+1,sala)
                    conexiones[salas[sala][index+1].socketId].emit('tedio',username,poder) 
                }
             
                break;
            case 0:
                salas[sala][index].puntacion+=poder.num;
                break;
            default:
                let aux=index;

                switch (poder.poder) {
                    case "rayo":
                        for (let i = 0; i < salas[sala].length; i++) {
                         
                            if(i==index){
                              
                            }else{
                          
                          
                            if(salas[sala][i]){
                                salas[sala][i].puntacion-=poder.num;
                                comprobarCero(i,sala)
                                conexiones[salas[sala][i].socketId].emit('tedio',username,poder) 
                            }
                        }



                        }
                    break;


                    case "bomba":
                    for (let i = 3; i > 0; i--) {
                         
                        if(salas[sala][index-i]){
                            salas[sala][index-i].puntacion-=poder.num;
                            comprobarCero(index-i,sala)
                            conexiones[salas[sala][index-i].socketId].emit('tedio',username,poder) 
                        }
                        
                    }

                    break;


                    case "estrella": 
                   
                     
                    salas[sala][index].puntacion+=poder.num;
                    emitirRanking(sala);
                    index=obtenerIndex(username,sala);
                    aux-=index;

                    for (let i = 1; i <= aux; i++) {
                        let probabilidad=Math.floor(Math.random() * 2);
                        console.log(probabilidad)
                        if(probabilidad==1){
                           
                            if(salas[sala][index+i]){
                                salas[sala][index+i].puntacion-=3;
                                comprobarCero(index+i,sala);
                              
                                conexiones[salas[sala][index+i].socketId].emit('tedio',username,poder) 
                            }
                            

                        }

                        
                    }
                        
                        break;

                    case "bill_bala" :
                    
                     
                    salas[sala][index].puntacion+=poder.num;
                    emitirRanking(sala);
                    index=obtenerIndex(username,sala);
                    aux-=index;

                    for (let i = 1; i <= aux; i++) {
                        
                     
                         
                           
                            if(salas[sala][index+i]){
                                salas[sala][index+i].puntacion-=5;
                                comprobarCero(index+i,sala);
                                
                                conexiones[salas[sala][index+i].socketId].emit('tedio',username,poder) 
                            }
                        

                        
                    }
                    
                    break;
                    case "caparazon_azul":

                        if(salas[sala][0]){
                            salas[sala][0].puntacion-=poder.num;
                            comprobarCero(0,sala)
                            conexiones[salas[sala][0].socketId].emit('tedio',username) 
                            let probabilidad=Math.floor(Math.random() * 2);
                            if(probabilidad==1){
                                if(salas[sala][1]){
                                    salas[sala][1].puntacion-=poder.num;
                                    comprobarCero(1,sala)
                                    conexiones[salas[sala][1].socketId].emit('tedio',username,poder) 
                                }

                            }
                        }

                    break;
                
                    default:
                        break;
                }


               




                break;
        }


            salas[sala][index].poder=null;
            emitirRanking(sala);     
        

    })


    socket.on('empezar',(sala)=>{

        socket.broadcast.to(sala).emit('pregunta', Preguntas[0]);
       
     //  io.to(sala).emit('pregunta', Preguntas[0]);     
     

        
        emitirRanking(sala)
    });

    socket.on('acabar',(sala)=>{

        salas[sala].forEach((user,index) => {
            conexiones[user.socketId].emit('acabar',index+1, user.puntacion);
        }) 
    })


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
        
        salas[sala][index].darPoder-=tiro;
        
        



        if(salas[sala][index].darPoder<=0){

          darPoderes(salas[sala],index)
        salas[sala][index].darPoder=15;
        }
        
        
    
        emitirRanking(sala);
    })

    function darPoderes(data,index){

        if(data[index].poder==null){
          let numeroAleatorio = Math.floor(Math.random() * 3);  
       
          let aux= ((index+1)*100)/data.length;
           
          if(aux<34){
            
          }
           if(aux>=34 && aux<67){
            let probabilidad=Math.floor(Math.random() * 3);
            if(probabilidad>0){
                numeroAleatorio+=3;

            }
            
            
           }
           if(aux>=67){
            let probabilidad=Math.floor(Math.random() * 5);
            if(probabilidad==1){
                numeroAleatorio+=3;
            }
            if(probabilidad>1){
                numeroAleatorio+=6;
            }

           
         
           }
           
           data[index].poder=poderes[numeroAleatorio];
          
           socket.emit('poderes', data[index].poder)
          



        }


    }
  
    socket.on('create-room', () => {
        const claveSala = uuidv4().slice(0, 5); 
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
       
       asignarValores()

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

    function asignarValores(){
        socket.user.puntacion=0;
        socket.user.index=0;
        socket.user.socketId=socket.id; 
        socket.user.darPoder=15;
        socket.user.poder=null;

    }

 

    

    socket.on('join-room', (claveSala) => {
        const room = io.sockets.adapter.rooms.get(claveSala);
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
         
        if (room) {
            socket.join(claveSala);
            console.log(`Usuario ${socket.user.username} (ID=${socket.user.id}) se unió a la sala: ${claveSala}`);

            socket.emit('room-joined', claveSala);
            asignarValores();
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
         
        
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
