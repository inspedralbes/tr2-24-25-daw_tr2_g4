<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <div>
    <div class="menu-mult">
      <h1 class="salas-titulo"><br>SALAS PRIVADAS</h1>

      <div v-if="!enSala" class="boton-grid">
        <q-btn @click="unirSala" class="boton-sp" glossy label="Unir Sala"></q-btn>
        <input type="text" v-model="claveSala" class="input-sala" placeholder="Clave de la sala" />
        <br><q-btn @click="crearSala" class="boton-sp" glossy label="Crear Sala"></q-btn>
      </div>

      <div id="room-info" v-else>
        <div class="clave-sala">
          <h2>{{ claveActual }}</h2>
        </div>

        <div class="usuarios-sala">
          <h3>Usuarios en la sala:</h3>
          <ul class="lista-usuarios">
            <li v-for="usuario in usuarios" :key="usuario.id" class="usuario-item">
              <span class="icono">🏀</span>
              <span class="nombre-usuario">{{ usuario.username }}</span>
            </li>
          </ul>
        </div>

        <div class="acciones-sala">
          <button @click="salirSala" class="boton-sala">Salir de la Sala</button>
        </div>

      </div>



    </div>

    <!-- Diálogo para alerta -->
    <q-dialog v-model="dialog" :backdrop-filter="backdropFilter">
      <q-card>
        <q-card-section class="row items-center q-pb-none text-h6">
          Aviso
        </q-card-section>

        <q-card-section>
          Introduce una clave de sala para unirte.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter';
import { ref } from "vue";
import getSocket from '@/socket';

export default {
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      socket: this.socket,
      claveSala: "", 
      claveActual: "", 
      usuarios: [], 
      enSala: false,
      dialog: false,
      backdropFilter: "hue-rotate(210deg)"
    };
  },
  methods: {
    crearSala() {
      this.socket.emit("create-room");
      this.$emit('boton');
    },

    unirSala() {
      if (this.claveSala.trim()) {
        this.socket.emit("join-room", this.claveSala.trim());
      } else {
        this.dialog = true; // Muestra el diálogo
      }
    },
    salirSala() {
      this.socket.emit("leave-room", this.claveActual);
      this.$emit('boton');
    },
    updateRoomView(clave) {
      this.enSala = true;
      this.claveActual = clave;
      const caja = useCounterStore();

      caja.SalaActual = clave;
      console.log(caja.SalaActual);
    },
    resetToMenu() {
      this.enSala = false;
      this.claveActual = "";
      this.usuarios = [];
    },
  },

  mounted() {
    const store = useCounterStore();
    const token = store.getLoginInfo.token;

    this.socket.on("connect_error", (err) => {
      console.error("Error al conectar:", err.message);
    });

    this.socket.on("room-created", (claveSala) => {
      this.updateRoomView(claveSala);
    });

    this.socket.on("room-joined", (claveSala) => {
      this.updateRoomView(claveSala);
    });

    this.socket.on("room-users", ({ room, users }) => {
      console.log(`Usuarios en la sala ${room}:`, users);

      this.claveActual = room;
      this.usuarios = users;
    });

    this.socket.on("left-room", () => {
      this.resetToMenu();
    });

    this.socket.on("error", (message) => {
      alert(message);
    });
  },
};
</script>

<style scoped>
#room-info {
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  margin: 20px auto;
  font-family: 'Press Start 2P', cursive;
}

/* Clave de la sala */
.clave-sala {
  text-align: center;
  margin-bottom: 20px;
}

.clave-sala h2 {
  font-size: 3rem;
  padding: 10px;
  margin: 0;
  background-color: #ffa500;
  color: #1e1e1e;
  border: 3px solid #ffffff;
  border-radius: 10px;
  display: inline-block;
}

.usuarios-sala {
  margin-top: 20px;
  overflow-y: auto; 
  max-height: 200px;
}

.usuarios-sala h3 {
  text-align: center;
  font-size: 1.5rem;
  color: #ffa500;
  margin-bottom: 10px;
}

.lista-usuarios {
  list-style: none;
  padding: 0;
  margin: 0;
}

.usuario-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2d2d2d;
  margin-bottom: 10px;
}

.icono {
  font-size: 1.5rem;
}

.nombre-usuario {
  font-size: 1rem;
  color: #ffffff;
}

.acciones-sala {
  display: flex;
  justify-content: space-evenly; 
  margin-top: 30px;
}

.boton-sala {
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #ff4500;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
}

.boton-sala:hover {
  background-color: #ffa500;
  transform: scale(1.05);
}

.boton-sala:active {
  transform: scale(1);
}

@media (min-width: 1024px) {
  #room-info {
    max-width: 800px;
  }

  .clave-sala h2 {
    font-size: 4rem;
  }

  .usuarios-sala h3 {
    font-size: 2rem;
  }

  .icono {
    font-size: 2rem;
  }

  .nombre-usuario {
    font-size: 1.25rem;
  }

  .boton-sala {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .clave-sala h2 {
    font-size: 2rem;
    padding: 8px;
  }

  .usuarios-sala h3 {
    font-size: 1.25rem;
  }

  .icono {
    font-size: 1.25rem;
  }

  .nombre-usuario {
    font-size: 0.875rem;
  }

  .boton-sala {
    font-size: 0.875rem;
    padding: 8px 16px;
  }
}







.menu-mult {
  text-align: center;
  grid-column: 2;
  font-size: 20px;
}

.boton-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  font-family: 'Press Start 2P', cursive;
}

.input-sala {
  width: 300px;
  max-width: 90%;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
}

.boton-sp {
  width: 300px;
  max-width: 90%;
  font-size: 20px;
  background-color: #ff4500;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 20px 20px;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s, transform 0.2s;
}

.boton-sp:hover {
  background-color: #ffffff;
  color: #ff4500;
  transform: scale(1.1);
}

.boton-sp:active {
  transform: scale(1);
}


.salas-titulo {
  font-size: 27px;
  padding: 0px;
  margin-top: 0;
  font-family: 'Press Start 2P', cursive;
  background-color: #1e1e1e;
  color: #ffffff;

}
</style>
