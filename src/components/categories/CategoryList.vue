<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  editingId: {
    type: [Number, String, null],
    default: null
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[400px]">
    <!-- List Header -->
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
      <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category Name</span>
      <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</span>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
      <div class="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p class="text-sm">Loading categories...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="categories.length === 0" class="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
      <div class="bg-gray-100 p-4 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </div>
      <p class="text-gray-900 font-medium">No categories found</p>
      <p class="text-sm mt-1">Create your first category using the form.</p>
    </div>

    <!-- List Content -->
    <ul v-else class="divide-y divide-gray-100">
      <li
        v-for="cat in categories"
        :key="cat.id"
        class="group flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
        :class="{'bg-indigo-50 hover:bg-indigo-50': editingId === cat.id}"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold uppercase group-hover:bg-white group-hover:shadow-sm transition-all">
            {{ cat.name.charAt(0) }}
          </div>
          <span 
            class="font-medium text-gray-700"
            :class="{'text-indigo-700 font-semibold': editingId === cat.id}"
          >
            {{ cat.name }}
          </span>
          <span v-if="editingId === cat.id" class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Editing</span>
        </div>
        
        <div class="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            @click="emit('edit', cat)"
            class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            @click="emit('delete', cat.id)"
            class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>