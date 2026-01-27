<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import { ref, onMounted } from 'vue'
// Mocking the import since the file might not exist in this context, 
// but keeping the logic requested.
// In a real app, ensure '../services/categoryService' exists.
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../services/categoryService'

const categories = ref([])
const name = ref('')
const editingId = ref(null)
const isLoading = ref(false)
const isSaving = ref(false)

const fetchCategories = async () => {
  isLoading.value = true
  try {
    const res = await getCategories()
    categories.value = res.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  } finally {
    isLoading.value = false
  }
}

const saveCategory = async () => {
  if (!name.value) return alert('Name is required')
  
  isSaving.value = true
  try {
    if (editingId.value) {
      await updateCategory(editingId.value, { name: name.value })
    } else {
      await createCategory({ name: name.value })
    }
    
    cancelEdit()
    await fetchCategories()
  } catch (error) {
    console.error('Failed to save category:', error)
  } finally {
    isSaving.value = false
  }
}

const editCategory = (cat) => {
  name.value = cat.name
  editingId.value = cat.id
  // Focus logic could go here
}

const cancelEdit = () => {
  name.value = ''
  editingId.value = null
}

const removeCategory = async (id) => {
  if (confirm('Are you sure you want to delete this category?')) {
    try {
      await deleteCategory(id)
      await fetchCategories()
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }
}

onMounted(fetchCategories)
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Categories</h1>
          <p class="text-gray-500 text-sm mt-1">Manage your product categories and organization.</p>
        </div>
        <div class="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          Total: <span class="font-semibold text-gray-900">{{ categories.length }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Form Section (1 Column) -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">
              {{ editingId ? 'Edit Category' : 'Add New Category' }}
            </h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  v-model="name"
                  type="text"
                  placeholder="e.g. Summer Collection"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  @keyup.enter="saveCategory"
                  :disabled="isSaving"
                />
              </div>

              <div class="flex gap-2 pt-2">
                <button
                  @click="saveCategory"
                  :disabled="isSaving"
                  class="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex justify-center items-center gap-2"
                >
                  <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {{ editingId ? 'Update Category' : 'Create Category' }}
                </button>
                
                <button
                  v-if="editingId"
                  @click="cancelEdit"
                  :disabled="isSaving"
                  class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            <!-- Helper Text -->
            <div class="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <div class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xs text-indigo-800 leading-relaxed">
                  Categories help organize products for your customers. Try to keep names short and descriptive.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- List Section (2 Columns) -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[400px]">
            <!-- List Header -->
            <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category Name</span>
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</span>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
              <div class="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p class="text-sm">Loading categories...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="categories.length === 0" class="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <p class="text-gray-500 font-medium">No categories found</p>
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
                    @click="editCategory(cat)"
                    class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="removeCategory(cat.id)"
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
        </div>
      </div>
    </div>
  </AdminLayout>
</template>