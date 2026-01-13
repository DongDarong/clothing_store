
<script setup>

import { RouterLink, RouterView } from 'vue-router'

import { useAuth } from './composables/useAuth'

import { useCart } from './composables/useCart'



const { currentUser, logout } = useAuth()

const { cart } = useCart()

</script>



<template>

  <header>

    <nav>

      <div class="logo">VueStore</div>

      <div class="links">

        <RouterLink to="/shop">Shop</RouterLink>

        <RouterLink to="/cart">Cart ({{ cart.length }})</RouterLink>

        <RouterLink to="/about">About</RouterLink>

        <RouterLink to="/contact">Contact</RouterLink>

      </div>

      <div class="auth">

        <template v-if="!currentUser">

          <RouterLink to="/login">Login</RouterLink>

          <RouterLink to="/register">Register</RouterLink>

        </template>

        <template v-else>

          <RouterLink to="/profile">Profile</RouterLink>

          <button @click="logout" class="logout-btn">Logout</button>

        </template>

      </div>

    </nav>

  </header>



  <main>

    <RouterView />

  </main>

</template>



<style scoped>

header { background: #333; padding: 1rem; color: white; }

nav { display: flex; justify-content: space-between; align-items: center; max-width: 1000px; margin: 0 auto; }

.logo { font-weight: bold; font-size: 1.2rem; }

.links a, .auth a { color: white; margin-left: 15px; text-decoration: none; }

.links a:hover, .auth a:hover { text-decoration: underline; }

.logout-btn { margin-left: 15px; background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; }

main { max-width: 1000px; margin: 2rem auto; padding: 0 1rem; }

</style>
