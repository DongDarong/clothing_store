<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import UserForm from '../components/users/UserForm.vue'
import UserTable from '../components/users/UserTable.vue'

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../services/userService'

const users = ref([])
const isLoading = ref(false)
const isSaving = ref(false)

const form = ref({
  id: null,
  name: '',
  email: '',
  role: 'user',
  password: '',
  confirmPassword: ''
})

const fetchUsers = async () => {
  isLoading.value = true
  try {
    const res = await getUsers()
    users.value = res.data.data || res.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: ''
  }
}

const saveUser = async (payload) => {
  isSaving.value = true
  try {
    if (payload.id) {
      await updateUser(payload.id, payload)
    } else {
      await createUser(payload)
    }
    resetForm()
    await fetchUsers()
  } catch (error) {
    console.error('Failed to save user:', error)
  } finally {
    isSaving.value = false
  }
}

const editUser = (u) => {
  form.value = {
    ...u,
    password: '',
    confirmPassword: ''
  }
  // Scroll to top to ensure form is visible
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const removeUser = async (id) => {
  if (!confirm('Delete user?')) return
  try {
    await deleteUser(id)
    await fetchUsers()
  } catch (error) {
    console.error('Failed to delete user:', error)
  }
}

onMounted(fetchUsers)
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header Section -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Users</h1>
        <p class="text-gray-500 text-sm mt-1">Manage administrative and customer accounts.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Form Column -->
        <UserForm
          :model="form"
          :saving="isSaving"
          @save="saveUser"
          @cancel="resetForm"
        />

        <!-- Table Column -->
        <UserTable
          :users="users"
          :loading="isLoading"
          @edit="editUser"
          @delete="removeUser"
        />
      </div>
    </div>
  </AdminLayout>
</template>