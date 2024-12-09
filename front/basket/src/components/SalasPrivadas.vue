<template>
    <q-header class="bg-primary text-white">
        <q-toolbar>
            <q-btn flat round dense icon="arrow_back" @click="goBack" />
            <q-toolbar-title>Esperando Jugador</q-toolbar-title>
        </q-toolbar>
    </q-header>
    <div>
        <h1 class="text-center text-white bg-deep-orange q-pa-md no-margin">Salas Privadas</h1>
        <div id="menu" v-if="!enSala">
            <q-btn @click="crearSala" color="deep-orange" size="25px" class="boton_sala" glossy
                label="Crear Sala"></q-btn>
            <q-btn @click="unirSala" color="deep-orange" size="25px" class="boton_sala" glossy
                label="Unir Sala"></q-btn>
            <input type="text" v-model="claveSala" placeholder="Clave de la sala" />
        </div>

        <div id="room-info" v-else>
    <div class="q-mb-md">
      <h2 class="text-center text-orange"><span>{{ claveActual }}</span></h2>
    </div>

    <div>
      <h3 class="text-center text-h5">Usuarios en la sala:</h3>
      <q-list bordered class="q-pa-none">
        <q-item v-for="usuario in usuarios" :key="usuario">
          <q-item-section avatar>
            <q-avatar size="5rem">
              <span class="text-h4">🏀</span>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <span class="text-h6">{{ usuario }}</span>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="flex flex-center q-mt-lg">
      <q-spinner-hourglass color="orange" size="6em" />
    </div>

    <div class="flex justify-center q-mt-lg">
      <q-btn 
        @click="salirSala" 
        color="deep-orange" 
        size="lg" 
        glossy 
        label="Salir de la Sala" 
        class="q-pa-md"
      />
    </div>
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
        this.socket = io('http://localhost:3000', {
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

h1 {
    font-size: 46px;

}

.hidden {
    display: none;
}

#room-info {
    margin-top: 20px;
}
</style>