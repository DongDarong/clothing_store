<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'

import CategoryHeader from '../components/categories/CategoryHeader.vue'
import CategoryForm from '../components/categories/CategoryForm.vue'
import CategoryList from '../components/categories/CategoryList.vue'

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../services/categoryService'

const categories = ref([])
const name = ref('')
const editingId = ref(null)
const loading = ref(false)
const saving = ref(false)

const fetch = async () => {
  loading.value = true
  try {
    const res = await getCategories()
    categories.value = res.data.data || res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const save = async () => {
  if (!name.value) return

  saving.value = true

  try {
    editingId.value
      ? await updateCategory(editingId.value, { name: name.value })
      : await createCategory({ name: name.value })

    cancel()
    fetch()
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}

const edit = cat => {
  name.value = cat.name
  editingId.value = cat.id
}

const cancel = () => {
  name.value = ''
  editingId.value = null
}

const remove = async id => {
  if (confirm('Delete category?')) {
    await deleteCategory(id)
    fetch()
  }
}

onMounted(fetch)
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">

      <CategoryHeader :total="categories.length" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <CategoryForm
          :name="name"
          :editing="!!editingId"
          :saving="saving"
          @update:name="name = $event"
          @save="save"
          @cancel="cancel"
        />

        <CategoryList
          class="lg:col-span-2"
          :categories="categories"
          :loading="loading"
          :editingId="editingId"
          @edit="edit"
          @delete="remove"
        />

      </div>

    </div>
  </AdminLayout>
</template>

../components/layout/
AdminLayout.vue
Navbar.vue
Sidebar.vue