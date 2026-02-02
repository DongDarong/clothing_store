<script setup>
defineProps({
  totalOrders: {
    type: Number,
    default: 0
  }
})

defineEmits(['refresh', 'openCreate'])
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Orders</h1>
      <p class="text-gray-500 text-sm mt-1">Track and manage customer orders.</p>
    </div>
    <div class="flex gap-3">
      <button 
        @click="$emit('openCreate')" 
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Order
      </button>
      <button 
        @click="$emit('refresh')" 
        class="text-gray-500 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-gray-100" 
        title="Refresh"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      <div class="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm flex items-center">
        Total Orders: <span class="font-semibold text-gray-900 ml-1">{{ totalOrders }}</span>
      </div>
    </div>
  </div>
</template>