<template>
    <div>
      <h1>Salas Privadas</h1>
      <div id="menu" v-if="!enSala">
        <button @click="crearSala">Crear Sala</button>
        <input type="text" v-model="claveSala" placeholder="Clave de la sala" />
        <button @click="unirSala">Unirse a Sala</button>
      </div>
      <div id="room-info" v-else>
        <h2>Sala: <span>{{ claveActual }}</span></h2>
        <h3>Usuarios en la sala:</h3>
        <ul>
          <li v-for="usuario in usuarios" :key="usuario">{{ usuario }}</li>
        </ul>
        <button @click="salirSala">Salir de la Sala</button>
      </div>
    </div>
  </template>
  
  <script>
  import { io } from 'socket.io-client';
  
  export default {
    data() {
      return {
        socket: null,         // Conexión del socket
        claveSala: '',        // Clave de la sala ingresada por el usuario
        claveActual: '',      // Sala actual
        usuarios: [],         // Lista de usuarios en la sala
        enSala: false,        // Indicador de si el usuario está en una sala
      };
    },
    methods: {
      crearSala() {
        this.socket.emit('create-room');
      },
      unirSala() {
        if (this.claveSala.trim()) {
          this.socket.emit('join-room', this.claveSala.trim());
        } else {
          alert('Introduce una clave de sala');
        }
      },
      salirSala() {
        this.socket.emit('leave-room', this.claveActual);
      },
      updateRoomView(clave) {
        this.enSala = true;
        this.claveActual = clave;
      },
      resetToMenu() {
        this.enSala = false;
        this.claveActual = '';
        this.usuarios = [];
      },
    },
    mounted() {
      // Conectar el cliente de Socket.IO al server
      this.socket = io('http://localhost:3000',{
        transports: ['websocket'],
        withCredentials: true
      }); 
  
      this.socket.on('room-created', (claveSala) => {
        this.updateRoomView(claveSala);
      });
  
      this.socket.on('room-joined', (claveSala) => {
        this.updateRoomView(claveSala);
      });
  
      this.socket.on('room-users', ({ room, users }) => {
        this.claveActual = room;
        this.usuarios = users;
      });
  
      this.socket.on('left-room', () => {
        this.resetToMenu();
      });
  
      this.socket.on('error', (message) => {
        alert(message);
      });
    },
    beforeDestroy() {
      // Cierra la conexión del socket al salir del componente
      if (this.socket) {
        this.socket.disconnect();
      }
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
  }
  .hidden {
    display: none;
  }
  #room-info {
    margin-top: 20px;
  }
  </style>
  