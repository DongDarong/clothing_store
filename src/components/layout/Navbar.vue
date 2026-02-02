<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const emit = defineEmits(['toggle-sidebar'])

const user = ref(null)
const loading = ref(true)

const fetchUser = async () => {
  try {
    const res = await api.get('/profile')
    // Adjust based on your API response structure (e.g., res.data.data or res.data)
    user.value = res.data.data || res.data
  } catch (err) {
    console.error('User fetch failed:', err)
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  try {
    await api.post('/logout')
  } catch {}

  localStorage.removeItem('token')
  location.href = '/login'
}

onMounted(fetchUser)
</script>

<template>
  <header class="h-16 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-white border-b border-gray-200">

    <!-- LEFT -->
    <div class="flex items-center gap-3">

      <!-- Hamburger -->
      <button
        @click="emit('toggle-sidebar')"
        class="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Brand -->
      <div class="flex items-center gap-2">
        <div class="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>

        <h1 class="font-bold text-lg text-gray-900 tracking-tight">
          Clothing Store Admin
        </h1>
      </div>

    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-4">

      <!-- Loading Skeleton -->
      <div v-if="loading"
        class="hidden md:flex items-center gap-3 pr-4 border-r border-gray-200 animate-pulse">

        <div class="text-right space-y-1">
          <div class="h-3 w-24 bg-gray-200 rounded"></div>
          <div class="h-2 w-16 bg-gray-200 rounded"></div>
        </div>

        <div class="h-8 w-8 rounded-full bg-gray-200"></div>
      </div>

      <!-- Real User -->
      <div v-else-if="user"
        class="hidden md:flex items-center gap-3 pr-4 border-r border-gray-200">

        <div class="text-right">
          <p class="text-sm font-medium text-gray-900">
            {{ user.name }}
          </p>
          <p class="text-xs text-gray-500">
            {{ user.email }}
          </p>
        </div>

        <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
          {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
        </div>
      </div>

      <!-- Logout -->
      <button
        @click="logout"
        class="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
      >
        <span>Logout</span>

        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400 group-hover:text-red-500 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>

    </div>

  </header>
</template>