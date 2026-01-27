<script setup>
// Sidebar logic (if needed in future)
</script>

<template>
  <div class="w-64 bg-gray-900 text-white flex flex-col h-full border-r border-gray-800 shadow-xl">
    <!-- Header Area -->
    <div class="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-900">
      <div class="flex items-center gap-2 text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span class="text-lg font-bold tracking-wide text-white">Admin Panel</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
      <p class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
      
      <router-link
        to="/"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
        exact-active-class="bg-indigo-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span class="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">Dashboard</span>
      </router-link>

      <router-link
        to="/categories"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group hover:bg-gray-800"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span class="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">Categories</span>
      </router-link>

      <router-link
        to="/products"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group hover:bg-gray-800"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">Products</span>
      </router-link>

          <router-link
      to="/profile"
      class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group hover:bg-gray-800"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">Profile</span>
    </router-link>
    </nav>

    <!-- Footer Area -->
    <div class="p-4 border-t border-gray-800 bg-gray-900">
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
  </div>
</template>