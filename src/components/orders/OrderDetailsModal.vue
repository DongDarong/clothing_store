<script setup>
import { computed } from 'vue'

const props = defineProps({
  order: Object,
  isUpdating: Boolean
})

const emit = defineEmits(['close', 'updateStatus', 'deleteOrder'])

const modalTotal = computed(() => {
  if (!props.order || !props.order.items) return 0
  return props.order.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
})

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
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="order" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          
          <!-- Modal Header -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <div>
              <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                Order #{{ order.id }}
              </h3>
              <p class="text-xs text-gray-500 mt-1">{{ formatDate(order.created_at) }}</p>
            </div>
            <button @click="$emit('close')" type="button" class="text-gray-400 hover:text-gray-500 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="px-4 py-5 sm:p-6">
            <!-- Status Update Section -->
            <div class="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <label class="block text-sm font-medium text-blue-900 mb-2">Update Order Status</label>
              <div class="flex gap-2">
                <select 
                  :value="order.status"
                  @change="e => $emit('updateStatus', e.target.value)"
                  :disabled="isUpdating"
                  class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-blue-200 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span v-if="isUpdating" class="flex items-center text-blue-600 text-xs">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </div>
            </div>

            <!-- Items List -->
            <div class="mt-4">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Order Items</h4>
              <ul role="list" class="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                <li v-for="item in order.items" :key="item.id" class="flex py-3 px-4 hover:bg-gray-50">
                  <div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img 
                      v-if="item.product?.image" 
                      :src="`http://127.0.0.1:8000/storage/${item.product.image}`" 
                      class="h-full w-full object-cover object-center" 
                    />
                    <div v-else class="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">IMG</div>
                  </div>

                  <div class="ml-4 flex flex-1 flex-col">
                    <div>
                      <div class="flex justify-between text-sm font-medium text-gray-900">
                        <h3>{{ item.product?.name || 'Unknown Product' }}</h3>
                        <p class="ml-4">${{ (item.price * item.quantity).toFixed(2) }}</p>
                      </div>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-xs">
                      <p class="text-gray-500">{{ item.quantity }} x ${{ item.price }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Summary -->
            <div class="mt-6 border-t border-gray-100 pt-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Subtotal</span>
                <span class="font-medium text-gray-900">${{ modalTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm mt-2">
                <span class="text-gray-500">Tax (0%)</span>
                <span class="font-medium text-gray-900">$0.00</span>
              </div>
              <div class="flex justify-between text-base font-bold mt-4 pt-4 border-t border-gray-100">
                <span class="text-gray-900">Total</span>
                <span class="text-indigo-600">${{ order.total }}</span>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between gap-2">
            <button 
              type="button" 
              class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              @click="$emit('close')"
            >
              Close
            </button>
            <button 
              type="button" 
              class="mt-3 inline-flex w-full justify-center rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-100 sm:mt-0 sm:w-auto"
              @click="$emit('deleteOrder', order.id)"
            >
              Delete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>