<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  show: Boolean,
  users: Array,
  products: Array,
  isUpdating: Boolean
})

const emit = defineEmits(['close', 'submit'])

const createForm = ref({
  user_id: '',
  items: []
})

const tempItem = ref({
  product_id: '',
  quantity: 1
})

const draftTotal = computed(() => {
  return createForm.value.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const addItemToDraft = () => {
  if (!tempItem.value.product_id || tempItem.value.quantity < 1) return
  
  const product = props.products.find(p => p.id === tempItem.value.product_id)
  if (!product) return

  // Check if item already in draft, if so, update quantity
  const existingIndex = createForm.value.items.findIndex(i => i.product_id === tempItem.value.product_id)
  
  if (existingIndex > -1) {
    createForm.value.items[existingIndex].quantity += tempItem.value.quantity
  } else {
    createForm.value.items.push({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: tempItem.value.quantity,
      image: product.image
    })
  }

  // Reset temp item
  tempItem.value = { product_id: '', quantity: 1 }
}

const removeItemFromDraft = (index) => {
  createForm.value.items.splice(index, 1)
}

const closeModal = () => {
  createForm.value = { user_id: '', items: [] }
  tempItem.value = { product_id: '', quantity: 1 }
  emit('close')
}

const submit = () => {
  emit('submit', createForm.value)
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
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all">
          
          <!-- Header -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-900">Create New Order</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 space-y-6">
            <!-- Customer Select -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Customer <span class="text-red-500">*</span></label>
              <select v-model="createForm.user_id" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="" disabled>Select a customer</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }} ({{ user.email }})
                </option>
              </select>
            </div>

            <!-- Add Product Row -->
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-medium text-gray-700 mb-2">Add Items</label>
              <div class="flex gap-2">
                <select v-model="tempItem.product_id" class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="" disabled>Select Product...</option>
                  <option v-for="prod in products" :key="prod.id" :value="prod.id">
                    {{ prod.name }} - ${{ prod.price }}
                  </option>
                </select>
                <input 
                  v-model.number="tempItem.quantity" 
                  type="number" 
                  min="1" 
                  class="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
                <button 
                  @click="addItemToDraft"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <!-- Draft Items Table -->
            <div v-if="createForm.items.length > 0" class="border rounded-lg overflow-hidden">
              <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-2 font-medium text-gray-500">Product</th>
                    <th class="px-4 py-2 font-medium text-gray-500 text-right">Qty</th>
                    <th class="px-4 py-2 font-medium text-gray-500 text-right">Price</th>
                    <th class="px-4 py-2 font-medium text-gray-500 text-right">Total</th>
                    <th class="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(item, index) in createForm.items" :key="index">
                    <td class="px-4 py-2 text-gray-900">{{ item.name }}</td>
                    <td class="px-4 py-2 text-right">{{ item.quantity }}</td>
                    <td class="px-4 py-2 text-right">${{ item.price }}</td>
                    <td class="px-4 py-2 text-right font-medium">${{ (item.price * item.quantity).toFixed(2) }}</td>
                    <td class="px-4 py-2 text-right">
                      <button @click="removeItemFromDraft(index)" class="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <td colspan="3" class="px-4 py-3 text-right font-bold text-gray-900">Total:</td>
                    <td class="px-4 py-3 text-right font-bold text-indigo-600">${{ draftTotal.toFixed(2) }}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div v-else class="text-center py-6 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
              No items added yet.
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button 
              @click="closeModal" 
              class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              @click="submit"
              :disabled="isUpdating || createForm.items.length === 0 || !createForm.user_id"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span v-if="isUpdating" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>