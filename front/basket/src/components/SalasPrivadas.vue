<template>
  <div>
    <div class="menu-mult">
      <h1 class="text-center text-white bg-deep-orange q-pa-md no-margin"><br>Salas Privadas</h1>

      <div v-if="!enSala" class="boton-grid">
        <q-btn @click="crearSala" color="deep-orange" size="25px" class="boton_sala" glossy label="Crear Sala"></q-btn>
        <input type="text" v-model="claveSala" class="input-sala" placeholder="Clave de la sala" />
        <q-btn @click="unirSala" color="deep-orange" size="25px" class="boton_sala" glossy label="Unir Sala"></q-btn>

        
      </div>

      <div id="room-info" v-else>
        <div class="q-mb-md">
          <h2 class="text-center text-orange"><span>{{ claveActual }}</span></h2>
        </div>

        <div>
          <h3 class="text-center text-h5">Usuarios en la sala:</h3>
          <q-list bordered class="q-pa-none">
            <q-item v-for="usuario in usuarios" :key="usuario.id">
              <q-item-section avatar>
                <q-avatar size="5rem">
                  <span class="text-h4">🏀</span>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <span class="text-h6">{{ usuario.username }}</span> 
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="flex flex-center q-mt-lg">
          <q-spinner-hourglass color="orange" size="6em" />
        </div>

        <div class="flex justify-center q-mt-lg">
          <q-btn @click="salirSala" color="deep-orange" size="lg" glossy label="Salir de la Sala" class="q-pa-md" />
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
      claveSala: "", // Clave de la sala ingresada por el usuario
      claveActual: "", // Sala actual
      usuarios: [], // Lista de usuarios en la sala
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

      caja.SalaActual=clave;
      console.log(caja.SalaActual)
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
.menu-mult {
  text-align: center;
  grid-column: 2;
}

.boton-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
}

.input-sala {
  grid-column: 1 / -1;
  width: 80%;
  padding: 10px;
  font-size: 16px;
  text-align: center;
}

.boton_sala {
  width: 90%;
  font-size: 18px;
}

.boton-volver {
  position: fixed;
  bottom: 20px;
  transform: translateX(-50%);
  width: 200px;
  font-size: 18px;
  padding: 10px;
  text-align: center;
}
</style>
