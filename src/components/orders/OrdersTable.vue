<script setup>
defineProps({
  orders: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['viewDetails', 'deleteOrder'])

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'bg-green-100 text-green-700 ring-green-600/20'
    case 'processing': return 'bg-blue-100 text-blue-700 ring-blue-600/20'
    case 'cancelled': return 'bg-red-100 text-red-700 ring-red-600/20'
    default: return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20'
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px] flex flex-col">
    
    <!-- Loading State -->
    <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
      <div class="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p class="text-sm">Loading orders...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="orders.length === 0" class="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p class="text-gray-900 font-medium">No orders found</p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Total</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors group">
            <td class="px-6 py-4 font-medium text-indigo-600">
              #{{ order.id }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                  {{ order.user?.name ? order.user.name.charAt(0) : 'U' }}
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ order.user?.name || 'Guest' }}</div>
                  <div class="text-xs text-gray-500">{{ order.user?.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ formatDate(order.created_at) }}
            </td>
            <td class="px-6 py-4">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset capitalize"
                :class="getStatusColor(order.status)"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right font-medium text-gray-900">
              ${{ order.total }}
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button 
                  @click="$emit('viewDetails', order)"
                  class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  title="View Details / Update"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button 
                  @click="$emit('deleteOrder', order.id)"
                  class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete Order"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>