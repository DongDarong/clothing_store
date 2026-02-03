import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Dashboard from '../pages/Dashboard.vue'
import Categories from '../pages/Categories.vue'
import Products from '../pages/Products.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Users from '../pages/Users.vue'
import Orders from '../pages/Orders.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },

  { path: '/categories', component: Categories, meta: { requiresAuth: true } },
  { path: '/products', component: Products, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/users', component: Users, meta: { requiresAuth: true } },
  { path: '/orders', component: Orders, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* 🔐 Auth Guard */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // requires login
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // already logged in → don't allow login page
  if (to.path === '/login' && token) {
    return next('/')
  }

  next()
})

export default router
