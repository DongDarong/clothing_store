<script setup>
import { ref } from 'vue'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="flex h-screen overflow-hidden">

    <Sidebar
      :open="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <div class="flex-1 flex flex-col">

      <Navbar
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>

    </div>

  </div>
</template>
