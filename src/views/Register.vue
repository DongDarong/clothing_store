<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const name = ref('')
const email = ref('')
const password = ref('')
const { register } = useAuth()

const handleSubmit = () => {
  register(email.value, password.value, name.value)
}
</script>

<template>
  <div class="form-container">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="name" type="text" placeholder="Full Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.form-container { max-width: 400px; margin: 0 auto; text-align: center; }
input { display: block; width: 100%; padding: 10px; margin: 10px 0; }
button { width: 100%; padding: 10px; background: #333; color: white; cursor: pointer; }
</style>
