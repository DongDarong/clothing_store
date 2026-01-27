<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import { ref, onMounted } from 'vue'
// Ensure these services exist in your project
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productService'
import { getCategories } from '../services/categoryService'

const products = ref([])
const categories = ref([])
const imageFile = ref(null)
const isLoading = ref(false)
const isSaving = ref(false)

const form = ref({
  id: null,
  name: '',
  price: '',
  category_id: '',
  description: ''
})

const fetchProducts = async () => {
  isLoading.value = true
  try {
    const res = await getProducts()
    // adjusting based on your API structure (res.data.data or res.data)
    products.value = res.data.data || res.data 
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const res = await getCategories()
    categories.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const onImageChange = (e) => {
  imageFile.value = e.target.files[0]
}

const saveProduct = async () => {
  if (!form.value.name || !form.value.price || !form.value.category_id) {
    return alert('Please fill all required fields')
  }

  isSaving.value = true
  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('price', form.value.price)
    formData.append('category_id', form.value.category_id)
    formData.append('description', form.value.description)

    if (imageFile.value) {
      formData.append('image', imageFile.value)
    }

    if (form.value.id) {
      // For updates, you might need to handle _method: 'PUT' if using Laravel/PHP backends with FormData
      // formData.append('_method', 'PUT'); 
      await updateProduct(form.value.id, formData)
    } else {
      await createProduct(formData)
    }

    resetForm()
    await fetchProducts()
  } catch (error) {
    console.error('Failed to save product:', error)
    alert('Failed to save product.')
  } finally {
    isSaving.value = false
  }
}

const editProduct = (p) => {
  form.value = {
    id: p.id,
    name: p.name,
    price: p.price,
    category_id: p.category_id,
    description: p.description
  }
  imageFile.value = null
  // Scroll to top on mobile to see form
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const removeProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await deleteProduct(id)
      await fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    price: '',
    category_id: '',
    description: ''
  }
  imageFile.value = null
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  return `http://127.0.0.1:8000/storage/${imagePath}`
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Product Management</h1>
          <p class="text-gray-500 text-sm mt-1">Add, edit, and organize your store's inventory.</p>
        </div>
        <div class="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          Total Products: <span class="font-semibold text-gray-900">{{ products.length }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <!-- Form Section -->
        <div class="xl:col-span-1">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">
              {{ form.id ? 'Edit Product' : 'Add New Product' }}
            </h2>
            
            <div class="space-y-4">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Product Name <span class="text-red-500">*</span></label>
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">Price <span class="text-red-500">*</span></label>
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">Category <span class="text-red-500">*</span></label>
                  <select
                    v-model="form.category_id"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                  >
                    <option value="" disabled>Select...</option>
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
                ></textarea>
              </div>

              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <input
                  type="file"
                  @change="onImageChange"
                  accept="image/*"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all border border-gray-300 rounded-lg"
                />
                <p v-if="form.id && !imageFile" class="text-xs text-gray-400 mt-1">Leave empty to keep current image.</p>
              </div>

              <!-- Buttons -->
              <div class="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  @click="saveProduct"
                  :disabled="isSaving"
                  class="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex justify-center items-center gap-2"
                >
                  <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {{ form.id ? 'Update' : 'Create' }}
                </button>
                
                <button
                  v-if="form.id"
                  @click="resetForm"
                  :disabled="isSaving"
                  class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- List Section -->
        <div class="xl:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px]">
            <!-- Table Header -->
            <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Inventory List</h3>
            </div>

            <!-- Loading -->
            <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
              <div class="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p class="text-sm">Loading products...</p>
            </div>

            <!-- Empty -->
            <div v-else-if="products.length === 0" class="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
              <div class="bg-gray-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p class="text-gray-900 font-medium">No products found</p>
              <p class="text-sm mt-1">Start by adding a new product on the left.</p>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                    <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                    <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                    <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="p in products" :key="p.id" class="hover:bg-gray-50 transition-colors group">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-4">
                        <div class="h-12 w-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <img
                            v-if="p.image"
                            :src="getImageUrl(p.image)"
                            class="h-full w-full object-cover"
                            alt="Product"
                          />
                          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">{{ p.name }}</div>
                          <div class="text-xs text-gray-500 truncate max-w-[150px]">{{ p.description || 'No description' }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {{ p.category?.name || 'Uncategorized' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-gray-900 font-medium">
                      ${{ p.price }}
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          @click="editProduct(p)"
                          class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          @click="removeProduct(p.id)"
                          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
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
        </div>
      </div>
    </div>
  </AdminLayout>
</template>