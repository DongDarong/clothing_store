<script setup>
import { ref, onMounted } from 'vue'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../services/categoryService'

const categories = ref([])
const name = ref('')
const editingId = ref(null)

const fetchCategories = async () => {
  const res = await getCategories()
  categories.value = res.data
}

const saveCategory = async () => {
  if (!name.value) return alert('Name is required')

  if (editingId.value) {
    await updateCategory(editingId.value, { name: name.value })
  } else {
    await createCategory({ name: name.value })
  }

  name.value = ''
  editingId.value = null
  fetchCategories()
}

const editCategory = (cat) => {
  name.value = cat.name
  editingId.value = cat.id
}

const removeCategory = async (id) => {
  if (confirm('Delete this category?')) {
    await deleteCategory(id)
    fetchCategories()
  }
}

onMounted(fetchCategories)
</script>

<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Category Management</h1>

    <!-- Form -->
    <div class="mb-4 flex gap-2">
      <input
        v-model="name"
        type="text"
        placeholder="Category name"
        class="border p-2 flex-1 rounded"
      />
      <button
        @click="saveCategory"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {{ editingId ? 'Update' : 'Add' }}
      </button>
    </div>

    <!-- List -->
    <ul>
      <li
        v-for="cat in categories"
        :key="cat.id"
        class="flex justify-between items-center border-b py-2"
      >
        <span>{{ cat.name }}</span>
        <div class="flex gap-2">
          <button
            @click="editCategory(cat)"
            class="text-blue-600"
          >
            Edit
          </button>
          <button
            @click="removeCategory(cat.id)"
            class="text-red-600"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
