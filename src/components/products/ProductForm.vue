<script setup>
defineProps({
  form: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  saving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save', 'cancel', 'image'])
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
    <h2 class="text-lg font-bold text-gray-900 mb-4">
      {{ form.id ? 'Edit Product' : 'Add New Product' }}
    </h2>

    <div class="space-y-4">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input 
          v-model="form.name"
          type="text"
          placeholder="e.g. Vintage T-Shirt"
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
        />
      </div>

      <!-- Price & Category -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <div class="relative">
             <span class="absolute left-3 top-2.5 text-gray-500">$</span>
            <input 
              v-model="form.price"
              type="number"
              step="0.01"
              placeholder="0.00"
              class="w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            v-model="form.category_id"
            class="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
          >
            <option disabled value="">Select category</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          v-model="form.description"
          rows="3"
          placeholder="Product details..."
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none" 
        />
      </div>

      <!-- Image -->
      <div>
         <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <input 
          type="file"
          @change="e => emit('image', e)"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all border border-gray-300 rounded-lg" 
        />
         <p v-if="form.id" class="text-xs text-gray-400 mt-1">Leave empty to keep current image.</p>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 pt-2">
        <button 
          @click="$emit('save')"
          :disabled="saving"
          class="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex justify-center items-center gap-2"
        >
           <span v-if="saving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
           {{ form.id ? 'Update' : 'Create' }}
        </button>

        <button 
          v-if="form.id"
          @click="$emit('cancel')"
          :disabled="saving"
          class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
</template>