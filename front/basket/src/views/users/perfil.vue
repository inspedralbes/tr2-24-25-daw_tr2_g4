<script setup>
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const useApp = useCounterStore();

const nombreUsuario = ref(useApp.loginInfo.username || '');
const correo = ref(useApp.loginInfo.email || '');
const avatar = ref(useApp.loginInfo.avatar || 1);
const nivel = ref(useApp.loginInfo.nivel || '');
const puntuacion = ref(useApp.loginInfo.score || 0);
const errores = ref('');
const cargando = ref(false);
const editando = ref(false);
const urlBase = "http://127.0.0.1:8000"; 
const mostrarCambioContrasena = ref(false);
const contrasenaActual = ref('');
const nuevaContrasena = ref('');

async function cambiarContrasena() {
    try {
        const response = await fetch(`${urlBase}/api/user/cambiar-contra`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${useApp.loginInfo.token}`,
            },
            body: JSON.stringify({
                contrasena_actual: contrasenaActual.value,  
                nueva_contrasena: nuevaContrasena.value,   
            }),
        });

        if (!response.ok) throw new Error('Error al cambiar la contraseña');

        $q.notify({ type: 'positive', message: 'Contraseña cambiada con éxito' });
        mostrarCambioContrasena.value = false;
    } catch (error) {
        $q.notify({ type: 'negative', message: error.message });
    }
}


function cancelarCambioContrasena() {
    mostrarCambioContrasena.value = false;
}

async function editarYGuardarPerfil() {
    if (!nombreUsuario.value || !correo.value) {
        $q.notify({
            type: 'negative',
            message: 'El nombre de usuario y el correo electrónico son obligatorios.',
            position: 'top',
        });
        return;
    }

    cargando.value = true;
    $q.loading.show({
        spinner: 'QSpinnerFacebook',
        message: 'Guardando cambios...',
        backgroundColor: 'black',
        spinnerColor: 'white',
    });

    try {
        const response = await fetch(`${urlBase}/api/user/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${useApp.loginInfo.token}`,
            },
            body: JSON.stringify({
                username: nombreUsuario.value,
                email: correo.value,
                avatar: avatar.value,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors ? JSON.stringify(errorData.errors) : 'Error desconocido');
        }

        const data = await response.json();
        useApp.setLoginInfo({
            loggedIn: true,
            username: data.user.username,
            avatar: data.user.avatar,
            email: data.user.email,
            token: useApp.loginInfo.token,
        });

        editando.value = false;

        $q.notify({
            type: 'positive',
            message: 'Perfil actualizado con éxito',
            position: 'top',
        });
    } catch (error) {
        console.error('Error al guardar el perfil:', error);
        errores.value = error.message || 'Hubo un error al guardar el perfil.';
        $q.notify({
            type: 'negative',
            message: errores.value,
            position: 'top',
        });
    } finally {
        cargando.value = false;
        $q.loading.hide();
    }
}
</script>


<template>
    <main id="pagina_perfil" class="q-pa-md">
        <div class="text-h6">{{ editando ? 'Editar perfil' : 'Perfil del usuario' }}</div>

        <q-card flat bordered>
            <q-card-section>
                <div v-if="errores" class="text-negative q-mt-md">
                    <p>{{ errores }}</p>
                </div>

                <!-- Mostrar datos del usuario -->
                <div v-if="!editando">
                    <q-item>
                        <q-item-section>
                            <div><strong>Nombre de usuario:</strong> {{ nombreUsuario }}</div>
                            <div><strong>Correo electrónico:</strong> {{ correo }}</div>
                            <div><strong>Nivel:</strong> {{ nivel }}</div>
                            <div><strong>Puntuación:</strong> {{ puntuacion }}</div>
                        </q-item-section>
                    </q-item>
                    <div class="text-center q-mt-md">
                        <q-avatar>
                            <img :src="`/public/avatar/foto${avatar}.png`" />
                        </q-avatar>
                    </div>
                    <div class="q-mt-md text-center">
                        <q-btn color="primary" label="Editar perfil" @click="editando = true" />
                        <q-btn color="secondary" label="Cambiar contraseña" @click="mostrarCambioContrasena = true" />
                    </div>
                </div>

                <!-- Formulario de edición de perfil -->
                <div v-if="editando">
                    <q-input v-model="nombreUsuario" label="Nombre de usuario" filled class="q-mb-md"
                        :disable="cargando" />
                    <q-input v-model="correo" label="Correo electrónico" filled type="email" class="q-mb-md"
                        :disable="cargando" />

                    <div class="text-center q-mt-md">
                        <q-carousel v-model="avatar" swipeable infinite animated :disable="cargando"
                            style="width: 100px; height: 100px; border-radius: 50%; border: 1px solid #ccc;">
                            <q-carousel-slide v-for="i in 4" :key="i" :name="i"
                                :img-src="`/public/avatar/foto${i}.png`" />
                        </q-carousel <div class="q-mt-md text-center">
                        <q-btn :loading="cargando" color="primary" label="Guardar cambios" @click="editarYGuardarPerfil"
                            :disable="cargando" />
                        <q-btn color="negative" label="Cancelar" flat @click="editando = false" :disable="cargando" />
                    </div>
                </div>

                <!-- Modal para cambiar la contraseña -->
                <q-dialog v-model="mostrarCambioContrasena">
                    <q-card>
                        <q-card-section>
                            <div class="text-h6">Cambiar Contraseña</div>
                        </q-card-section>
                        <q-card-section>
                            <q-input v-model="contrasenaActual" label="Contraseña Actual" type="password" filled />
                            <q-input v-model="nuevaContrasena" label="Nueva Contraseña" type="password" filled />
                        </q-card-section>
                        <q-card-actions align="right">
                            <q-btn flat label="Volver" color="negative" @click="cancelarCambioContrasena" />
                            <q-btn flat label="Guardar" color="primary" @click="cambiarContrasena" />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
            </q-card-section>
        </q-card>

        <!-- Volver al menú -->
        <div class="q-mt-md text-center">
            <RouterLink to="/jugar">
                <q-btn color="red" glossy label="Volver" />
            </RouterLink>
        </div>
    </main>
</template>

<style scoped>
#pagina_perfil {
    max-width: 600px;
    margin: 0 auto;
}

.q-card {
    max-width: 400px;
}

.q-input {
    width: 100%;
}

.q-carousel {
    max-width: 300px;
    margin: 0 auto;
}

.q-btn {
    width: 200px;
}

.q-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ccc;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
}

.q-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
</style>
