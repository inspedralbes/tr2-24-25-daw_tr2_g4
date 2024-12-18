<script setup>
import { ref, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

// Quasar
const $q = useQuasar();
const router = useRouter();

// Estado del usuario
const useApp = useCounterStore();
const username = ref(useApp.loginInfo.username || '');
const email = ref(useApp.loginInfo.email || '');
const avatar = ref(useApp.loginInfo.avatar || 1);
const nivel = ref(useApp.loginInfo.nivel || '');
const score = ref(useApp.loginInfo.score || 0); // Ajuste en el puntaje
const errors = ref('');
const isLoading = ref(false);
const isEditing = ref(false);

// URL base del backend
const baseUrl = "http://127.0.0.1:8000"; // Cambia esto si tu backend usa otro puerto o dominio
// Método para guardar el perfil
async function saveProfile() {
    if (!username.value || !email.value) {
        $q.notify({
            type: 'negative',
            message: 'El nombre de usuario y el correo electrónico son obligatorios.',
            position: 'top',
        });
        return;
    }

    isLoading.value = true;

    $q.loading.show({
        spinner: 'QSpinnerFacebook',
        message: 'Guardando cambios...',
        backgroundColor: 'black',
        spinnerColor: 'white',
    });

    try {
        const response = await fetch(`${baseUrl}/api/user/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${useApp.loginInfo.token}`,
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                avatar: avatar.value,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al actualizar el perfil.');
        }

        // Actualizar el estado global (Pinia, Vuex, o lo que utilices)
        useApp.setLoginInfo({
            loggedIn: true,
            username: data.user.username, // El nombre de usuario actualizado
            avatar: data.user.avatar,     // El avatar actualizado
            email: data.user.email,       // El correo actualizado
            nivel: data.user.nivel,       // El nivel actualizado
        });

        isEditing.value = false;

        // Mostrar notificación de éxito
        $q.notify({
            type: 'positive',
            message: 'Perfil actualizado con éxito',
        });

    } catch (error) {
        console.error('Error al guardar el perfil:', error); // Ver los detalles del error
        errors.value = error.message || 'Hubo un error al guardar el perfil.';
        $q.notify({
            type: 'negative',
            message: errors.value,
            position: 'top',
        });
    } finally {
        isLoading.value = false;
        $q.loading.hide();
    }
}


</script>

<template>
    <main id="perfil_page" class="q-pa-md">
        <div class="text-h6">{{ isEditing ? 'Editar perfil' : 'Perfil del usuario' }}</div>

        <q-card flat bordered>
            <q-card-section>
                <div v-if="errors" class="text-negative q-mt-md">
                    <p>{{ errors }}</p>
                </div>

                <!-- Mostrar datos del usuario -->
                <div v-if="!isEditing">
                    <q-item>
                        <q-item-section>
                            <div><strong>Nombre de usuario:</strong> {{ username }}</div>
                            <div><strong>Correo electrónico:</strong> {{ email }}</div>
                            <div><strong>Nivel:</strong> {{ nivel }}</div>
                            <div><strong>Puntuación:</strong> {{ score }}</div>
                        </q-item-section>
                    </q-item>
                    <div class="text-center q-mt-md">
                        <q-avatar>
                            <img :src="`/public/avatar/foto${avatar}.png`" />
                        </q-avatar>
                    </div>
                    <div class="q-mt-md text-center">
                        <q-btn color="primary" label="Editar perfil" @click="isEditing = true" />
                    </div>
                </div>

                <!-- Formulario de edición de perfil -->
                <div v-if="isEditing">
                    <q-input v-model="username" label="Nombre de usuario" filled class="q-mb-md" :disable="isLoading" />
                    <q-input v-model="email" label="Correo electrónico" filled type="email" class="q-mb-md"
                        :disable="isLoading" />

                    <div class="text-center q-mt-md">
                        <q-carousel v-model="avatar" swipeable animated :disable="isLoading"
                            style="width: 100px; height: 100px; border-radius: 50%; border: 1px solid #ccc;">
                            <q-carousel-slide v-for="i in 7" :key="i" :name="i"
                                :img-src="`/public/avatar/foto${i}.png`" />
                        </q-carousel>
                    </div>

                    <div class="q-mt-md text-center">
                        <q-btn :loading="isLoading" color="primary" label="Guardar cambios" @click="saveProfile"
                            :disable="isLoading" />
                        <q-btn color="negative" label="Cancelar" flat @click="isEditing = false" :disable="isLoading" />
                    </div>
                </div>
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
#perfil_page {
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
