<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const email = ref('')
const password = ref('')
const { login } = useAuth()

const handleSubmit = () => {
  login(email.value, password.value)
}
</script>

<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>No account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<style scoped>
/* Basic form styling shared with Register */
.form-container { max-width: 400px; margin: 0 auto; text-align: center; }
input { display: block; width: 100%; padding: 10px; margin: 10px 0; }
button { width: 100%; padding: 10px; background: #333; color: white; cursor: pointer; }
</style>
