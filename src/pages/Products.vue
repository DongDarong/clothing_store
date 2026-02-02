<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'

// Components
import ProductHeader from '../components/products/ProductHeader.vue'
import ProductForm from '../components/products/ProductForm.vue'
import ProductTable from '../components/products/ProductTable.vue'

// Services
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
const loading = ref(false)
const saving = ref(false)

const form = ref({
  id: null,
  name: '',
  price: '',
  category_id: '',
  description: ''
})

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await getProducts()
    // Adjust based on API structure (res.data.data or res.data)
    products.value = res.data.data || res.data
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const res = await getCategories()
    categories.value = res.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const onImageChange = (e) => {
  imageFile.value = e.target.files[0]
}

const save = async () => {
  if (!form.value.name || !form.value.price || !form.value.category_id) {
    return alert('Please fill in all required fields.')
  }

  saving.value = true
  try {
    const fd = new FormData()
    // Append form fields
    Object.entries(form.value).forEach(([k, v]) => {
      if (v !== null && v !== undefined) fd.append(k, v)
    })
    // Append image if selected
    if (imageFile.value) fd.append('image', imageFile.value)

    // Update or Create
    if (form.value.id) {
        // Handle PUT method spoofing if necessary for FormData in some backends
        // fd.append('_method', 'PUT') 
        await updateProduct(form.value.id, fd)
    } else {
        await createProduct(fd)
    }

    reset()
    await fetchProducts()
  } catch (error) {
    console.error('Failed to save product:', error)
    alert('Failed to save product.')
  } finally {
    saving.value = false
  }
}

const edit = (p) => {
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

const remove = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return
  try {
    await deleteProduct(id)
    await fetchProducts()
  } catch (error) {
    console.error('Failed to delete product:', error)
    alert('Failed to delete product.')
  }
}

const reset = () => {
  form.value = {
    id: null,
    name: '',
    price: '',
    category_id: '',
    description: ''
  }
  imageFile.value = null
}

const imageUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `http://127.0.0.1:8000/storage/${path}`
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">

      <ProductHeader :total="products.length" />

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <!-- Form Section -->
        <ProductForm
          :form="form"
          :categories="categories"
          :saving="saving"
          @save="save"
          @cancel="reset"
          @image="onImageChange"
        />

        <!-- Table Section -->
        <ProductTable
          class="xl:col-span-2"
          :products="products"
          :loading="loading"
          :imageUrl="imageUrl"
          @edit="edit"
          @delete="remove"
        />

      </div>

    </div>
  </AdminLayout>
</template>