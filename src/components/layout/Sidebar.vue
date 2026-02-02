<script setup>
defineProps({
  open: Boolean
})

const emit = defineEmits(['close'])
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="open"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
    @click="emit('close')"
  />

  <!-- Sidebar -->
  <aside
    class="fixed md:static z-50 top-0 left-0 h-full bg-gray-900 text-white
           w-64 transform transition-transform duration-300
           flex flex-col border-r border-gray-800 shadow-xl"
    :class="open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
  >

    <!-- Header -->
    <div class="h-16 flex items-center justify-between px-6 border-b border-gray-800">
      <div class="flex items-center gap-2 text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>

        <span class="text-lg font-bold text-white">
          Admin Panel
        </span>
      </div>

      <!-- Mobile close -->
      <button
        class="md:hidden text-gray-400 hover:text-white"
        @click="emit('close')"
      >
        ✕
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">

      <p class="px-3 text-xs text-gray-500 uppercase mb-2">
        Main Menu
      </p>

      <router-link
        v-for="item in [
          { to:'/', label:'Dashboard' },
          { to:'/categories', label:'Categories' },
          { to:'/products', label:'Products' },
          { to:'/users', label:'Users' },
          { to:'/orders', label:'Orders' },
          { to:'/profile', label:'Profile' }
        ]"
        :key="item.to"
        :to="item.to"
        class="flex items-center px-3 py-2.5 rounded-lg text-sm
               hover:bg-gray-800 transition"
        active-class="bg-indigo-600 text-white"
        @click="emit('close')"
      >
        {{ item.label }}
      </router-link>

    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-800">
      <div class="bg-gray-800 rounded-lg p-3 flex items-center gap-3">
        <div class="h-8 w-8 rounded bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">
          v1
        </div>
        <div>
          <p class="text-xs font-medium text-white">Store Admin</p>
          <p class="text-[10px] text-gray-400">Version 1.0.0</p>
        </div>
      </div>
    </div>

  </aside>
</template>
