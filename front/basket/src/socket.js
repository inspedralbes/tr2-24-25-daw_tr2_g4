import { io } from 'socket.io-client';

let socketInstance;

const getSocket = (token) => {
  // Si no existe la instancia, la creamos
  if (!socketInstance) {
    console.log("Token enviado al servidor:", token);
   //  socketInstance = io("http://a23diemujper.juego.daw.inspedralbes.cat:20070", {
   socketInstance = io("localhost:1234", {
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        token: token,
      },
    });
  }
  return socketInstance;
};


const RemSocket=()=>{

  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;  
  }
}

export default { getSocket, RemSocket } ;
