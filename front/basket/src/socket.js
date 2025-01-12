import { io } from 'socket.io-client';

const socket = io('http://localhost:1234'); // Cambiar a la URL de tu backend en producción

export default socket;
