<script setup>
import { reactive, watch, ref } from 'vue'

const props = defineProps({
  model: {
    type: Object,
    required: true
  },
  saving: Boolean
})

const emit = defineEmits(['save', 'cancel'])

/* Local state */
const local = reactive({
  id: null,
  name: '',
  email: '',
  role: 'user',
  password: '',
  confirmPassword: ''
})

watch(() => props.model, (newVal) => {
  Object.assign(local, {
    id: newVal.id || null,
    name: newVal.name || '',
    email: newVal.email || '',
    role: newVal.role || 'user',
    password: '',
    confirmPassword: ''
  })
}, { immediate: true, deep: true })

const showPassword = ref(false)

/* Alert state */
const alert = ref({
  type: '',
  message: ''
})

const showAlert = (type, message) => {
  alert.value = { type, message }
  setTimeout(() => {
    alert.value.message = ''
  }, 3000)
}

/* Submit */
const submit = () => {
  if (!local.name || !local.email) {
    return showAlert('error', 'Name and Email are required')
  }

  if (!local.id && !local.password) {
    return showAlert('error', 'Password required for new user')
  }

  if (local.password !== local.confirmPassword) {
    return showAlert('error', 'Passwords do not match')
  }

  emit('save', { ...local })
  showAlert('success', local.id ? 'User updated!' : 'User created!')
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">

    <h2 class="text-lg font-bold text-gray-900 mb-4">
      {{ local.id ? 'Edit User' : 'Add New User' }}
    </h2>

    <!-- ALERT -->
    <transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="alert.message"
        class="px-4 py-3 rounded-lg text-sm mb-4 flex items-center gap-2"
        :class="alert.type === 'success'
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-red-50 text-red-700 border border-red-200'"
      >
        <span>{{ alert.message }}</span>
      </div>
    </transition>

    <div class="space-y-4">

      <!-- Name -->
      <div>
        <label class="text-sm font-medium text-gray-700">Full Name</label>
        <input
          v-model="local.name"
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="John Doe"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="local.email"
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="user@example.com"
        />
      </div>

      <!-- Role -->
      <div>
        <label class="text-sm font-medium text-gray-700">Role</label>
        <select
          v-model="local.role"
          class="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <!-- Password -->
      <div>
        <label class="text-sm font-medium text-gray-700">
          Password <span v-if="!local.id" class="text-red-500">*</span>
        </label>

        <div class="relative">
          <input
            v-model="local.password"
            :type="showPassword ? 'text' : 'password'"
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="********"
          />
          <button 
          type="button"              
          @click="showPassword = !showPassword"             
          class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"           >
                       <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>             <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>           
            </button>
        </div>

        <p v-if="local.id" class="text-xs text-gray-500 mt-1">
          Leave blank to keep current
        </p>
      </div>

      <!-- Confirm Password -->
      <div v-if="local.password || !local.id">
        <label class="text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div class="relative">
        <input
          v-model="local.confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="********"
        />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 mt-4 pt-2 border-t border-gray-100">

        <button
          @click="submit"
          :disabled="saving"
          class="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-lg font-medium flex justify-center items-center gap-2"
        >
          <span v-if="saving" class="animate-spin">⏳</span>
          {{ local.id ? 'Update' : 'Create' }}
        </button>

        <button
          v-if="local.id"
          @click="$emit('cancel')"
          class="bg-white border border-gray-300 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50"
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
</template>
