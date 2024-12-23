import { io } from 'socket.io-client';

let socketInstance;

const getSocket = (token) => {
  // Si no existe la instancia, la creamos
  if (!socketInstance) {
    console.log("Token enviado al servidor:", token);
    socketInstance = io("http://localhost:3000", {
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
