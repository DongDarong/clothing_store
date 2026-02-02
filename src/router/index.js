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
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { requiresAuth: true } // ❗ missing before
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* 🔐 Route Guard */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // If route requires auth and no token
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // If already logged in, prevent going back to login
  if (to.path === '/login' && token) {
    return next('/')
  }

  next()
})

export default router
