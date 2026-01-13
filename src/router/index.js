import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../views/Shop.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import { useAuth } from '../composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/shop' },
    { path: '/shop', component: Shop },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { 
      path: '/profile', 
      component: Profile,
      // Route Guard: Protect this route
      beforeEnter: (to, from, next) => {
        const { currentUser } = useAuth();
        if (!currentUser.value) next('/login');
        else next();
      }
    },
  ]
})

export default router
