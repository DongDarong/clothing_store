<script setup>
const logout = () => {
  localStorage.removeItem('token')
  location.href = '/login'
}
</script>

<template>
  <div class="h-16 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
    <!-- Left: Brand -->
    <div class="flex items-center gap-3">
      <div class="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h1 class="font-bold text-xl text-gray-900 tracking-tight">Clothing Store Admin</h1>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-4">
      <!-- User Info (Optional) -->
      <div class="hidden md:flex items-center gap-3 pr-4 border-r border-gray-200">
        <div class="text-right">
          <p class="text-sm font-medium text-gray-900">Admin User</p>
          <p class="text-xs text-gray-500">admin@store.com</p>
        </div>
        <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
          AD
        </div>
      </div>

      <!-- Logout Button -->
      <button 
        @click="logout" 
        class="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
        title="Sign out"
      >
        <span>Logout</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  </div>
</template>