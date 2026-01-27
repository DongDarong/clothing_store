<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import { ref, onMounted } from 'vue'
// Ensure these services exist in your project
import { getProfile, updateProfile } from '../services/profileService'

const profile = ref({
  name: '',
  email: ''
})
const isLoading = ref(false)
const isSaving = ref(false)
const successMessage = ref('')

const fetchProfile = async () => {
  isLoading.value = true
  try {
    const res = await getProfile()
    // Adapt this path based on your actual API response structure
    profile.value = res.data.data || res.data
  } catch (error) {
    console.error('Failed to load profile', error)
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  isSaving.value = true
  successMessage.value = ''
  
  try {
    await updateProfile(profile.value)
    successMessage.value = 'Profile updated successfully'
    // Clear message after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to save profile', error)
    alert('Failed to update profile')
  } finally {
    isSaving.value = false
  }
}

onMounted(fetchProfile)
</script>

<template>
  <AdminLayout>
    <div class="max-w-2xl mx-auto py-6">
      
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p class="text-gray-500 text-sm mt-1">Manage your profile information and preferences.</p>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        <!-- Profile Header / Cover -->
        <div class="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <div class="px-8 pb-8">
          <!-- Avatar Section -->
          <div class="relative -mt-12 mb-8 flex items-end">
            <div class="h-24 w-24 rounded-xl ring-4 ring-white bg-white shadow-md flex items-center justify-center text-3xl font-bold text-indigo-600 uppercase">
              {{ profile.name ? profile.name.charAt(0) : 'U' }}
            </div>
            <div class="ml-4 mb-1">
              <h2 class="text-xl font-bold text-gray-900">{{ profile.name || 'User' }}</h2>
              <p class="text-sm text-gray-500">Administrator</p>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="flex justify-center py-12">
            <div class="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="saveProfile" class="space-y-6">
            
            <!-- Success Notification -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 -translate-y-2"
              enter-to-class="transform opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 translate-y-0"
              leave-to-class="transform opacity-0 -translate-y-2"
            >
              <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                {{ successMessage }}
              </div>
            </transition>

            <div class="grid grid-cols-1 gap-6">
              <!-- Name Input -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    v-model="profile.name"
                    type="text"
                    required
                    class="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              <!-- Email Input -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    v-model="profile.email"
                    type="email"
                    required
                    class="pl-10 block w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSaving"
                class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg text-sm font-medium shadow-sm transition-all flex items-center gap-2"
              >
                <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>