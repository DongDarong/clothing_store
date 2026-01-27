import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Home from '../pages/Home.vue'
import Categories from '../pages/Categories.vue'
import Products from '../pages/Products.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
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
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* 🔐 Route Guard */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router
