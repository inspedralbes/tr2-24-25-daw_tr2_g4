import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/inicio.vue'
import Menu from '../views/menu.vue'
import historia from '../views/modos/historia.vue'
import arcade from '../views/modos/arcade.vue'
import multijugador from '../views/modos/multijugador.vue'
import registro from '../views/users/registro.vue'
import login from '../views/users/login.vue'
import perfil from '../views/users/perfil.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Inicio,
    },
    {
      path: '/user/login',
      name: 'login',
      component: login,
    },
    {
      path: '/user/register',
      name: 'register',
      component: registro,
    },
    {
      path: '/user/perfil',
      name: 'perfil',
      component: perfil,
    },
    {
      path: '/jugar/arcade', // Ruta: '/dashboard/profile'
      name: 'arcade',
      component: arcade,
    },
    {
      path: '/jugar/historia', // Ruta: '/dashboard/profile'
      name: 'historia',
      component: historia,
    },
    ,
    {
      path: '/jugar/multijugador', // Ruta: '/dashboard/profile'
      name: 'multijugador',
      component: multijugador,
    },

    {
      path: '/jugar',
      name: 'jugar',
      component: Menu,
    },
    
   /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },*/
  ],
})

export default router
