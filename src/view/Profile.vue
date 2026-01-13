
<script setup>

import { useAuth } from '../composables/useAuth'



const { currentUser, logout } = useAuth()

</script>



<template>

  <div class="profile" v-if="currentUser">

    <h2>User Profile</h2>

    <p><strong>Name:</strong> {{ currentUser.name }}</p>

    <p><strong>Email:</strong> {{ currentUser.email }}</p>

    <button @click="logout">Logout</button>

  </div>

</template>



<style scoped>

.profile { max-width: 500px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; border-radius: 8px; }

button { background: #e74c3c; color: white; border: none; padding: 10px 20px; cursor: pointer; margin-top: 10px; }

</style>
