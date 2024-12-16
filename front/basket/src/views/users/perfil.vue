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
const score = ref(0); 
// Campos de error
const errors = ref('');

const isLoading = ref(false);

const isEditing = ref(false);

async function saveProfile() {
    isLoading.value = true;
    $q.loading.show({
        spinner: 'QSpinnerFacebook',
        message: 'Guardando cambios...',
        backgroundColor: 'black',
        spinnerColor: 'white',
    });

    try {
        // Llamar a la API para actualizar el perfil del usuario
        const data = await updateUserProfile({
            username: username.value,
            email: email.value,
            avatar: avatar.value,
        });

        if (data.errors) {
            errors.value = data.errors;
        } else {
            useApp.setLoginInfo({
                loggedIn: true,
                username: data.user.username,
                avatar: data.user.avatar,
                email: data.user.email,
                nivel: data.user.nivel,
            });

            router.push('/user/login');
        }
    } catch (error) {
        errors.value = 'Hubo un error al guardar el perfil.';
    } finally {
        isLoading.value = false;
        $q.loading.hide();
    }
}

/*async function fetchUserRanking() {
    
}*/

onMounted(() => {
    //fetchUserRanking();
});
</script>

<template>
    <main id="perfil_page" class="q-pa-md">
        <q-card flat bordered>
            <q-card-section>
                <div class="text-h6">{{ isEditing ? 'Editar perfil' : 'Perfil del usuario' }}</div>
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
                        <q-avatar size="90px">
                            <img :src="`/public/avatar/boy${avatar}.png`" />
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
                            <q-carousel-slide v-for="i in 7" :key="i" :name="i" :img-src="`/public/avatar/boy${i}.png`" />
                        </q-carousel>
                    </div>

                    <div class="q-mt-md text-center">
                        <q-btn :loading="isLoading" color="primary" label="Guardar cambios" @click="saveProfile"
                            :disable="isLoading" />
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
    max-width: 500px;
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
</style>
