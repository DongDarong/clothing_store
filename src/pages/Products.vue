<script setup>
import { ref, onMounted } from 'vue'
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

const form = ref({
  id: null,
  name: '',
  price: '',
  category_id: '',
  description: ''
})

const fetchProducts = async () => {
  const res = await getProducts()
  products.value = res.data.data   // ✅ FIX
}

const fetchCategories = async () => {
  const res = await getCategories()
  categories.value = res.data      // (category API returns array)
}

const onImageChange = (e) => {
  imageFile.value = e.target.files[0]
}

const saveProduct = async () => {
  if (!form.value.name || !form.value.price || !form.value.category_id) {
    return alert('Please fill all required fields')
  }

  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('price', form.value.price)
  formData.append('category_id', form.value.category_id)
  formData.append('description', form.value.description)

  if (imageFile.value) {
    formData.append('image', imageFile.value)
  }

  if (form.value.id) {
    await updateProduct(form.value.id, formData)
  } else {
    await createProduct(formData)
  }

  resetForm()
  fetchProducts()
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
}

const removeProduct = async (id) => {
  if (confirm('Delete this product?')) {
    await deleteProduct(id)
    fetchProducts()
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

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Product Management</h1>

    <!-- Form -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <input v-model="form.name" placeholder="Product name" class="border p-2 rounded" />
      <input v-model="form.price" type="number" placeholder="Price" class="border p-2 rounded" />

      <select v-model="form.category_id" class="border p-2 rounded col-span-2">
        <option value="">Select Category</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>

      <textarea
        v-model="form.description"
        placeholder="Description"
        class="border p-2 rounded col-span-2"
      ></textarea>

      <!-- Image upload -->
      <input
        type="file"
        @change="onImageChange"
        class="border p-2 rounded col-span-2"
      />

      <button
        @click="saveProduct"
        class="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
      >
        {{ form.id ? 'Update Product' : 'Add Product' }}
      </button>
    </div>

    <!-- List -->
    <table class="w-full border">
      <thead class="bg-gray-100">
        <tr>
          <th class="border p-2">Image</th>
          <th class="border p-2">Name</th>
          <th class="border p-2">Price</th>
          <th class="border p-2">Category</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td class="border p-2">
            <img
              v-if="p.image"
              :src="`http://127.0.0.1:8000/storage/${p.image}`"
              class="w-16 h-16 object-cover"
            />
          </td>
          <td class="border p-2">{{ p.name }}</td>
          <td class="border p-2">${{ p.price }}</td>
          <td class="border p-2">{{ p.category?.name }}</td>
          <td class="border p-2">
            <button @click="editProduct(p)" class="text-blue-600 mr-2">Edit</button>
            <button @click="removeProduct(p.id)" class="text-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
