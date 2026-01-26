<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'

const email = ref('')
const password = ref('')
const router = useRouter()

const submit = async () => {
  try {
    const res = await login({ email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch {
    alert('Login failed')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="border p-6 rounded w-80">
      <h2 class="text-xl font-bold mb-4">Admin Login</h2>
      <input v-model="email" placeholder="Email" class="border p-2 w-full mb-2" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full mb-4" />
      <button @click="submit" class="bg-blue-600 text-white w-full py-2 rounded">
        Login
      </button>
    </div>
  </div>
</template>
