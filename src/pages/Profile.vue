<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile } from '../services/profileService'

import ProfileTabs from '../components/profile/ProfileTabs.vue'
import ProfileForm from '../components/profile/ProfileForm.vue'
import SettingsForm from '../components/profile/SettingsForm.vue'
import ProfileSuccess from '../components/profile/ProfileSuccess.vue'
import ProfileLoading from '../components/profile/ProfileLoading.vue'

const activeTab = ref('profile')
const profile = ref({ name: '', email: '' })
const successMessage = ref('')
const isLoading = ref(false)
const isSaving = ref(false)

const fetchProfile = async () => {
  isLoading.value = true
  try {
    const res = await getProfile()
    profile.value = res.data.data || res.data
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  isSaving.value = true
  await updateProfile(profile.value)
  successMessage.value = 'Profile updated successfully'
  setTimeout(() => successMessage.value = '', 3000)
  isSaving.value = false
}

onMounted(fetchProfile)
</script>

<template>
  <AdminLayout>
    <div class="max-w-2xl mx-auto py-6 space-y-6">

      <ProfileTabs v-model="activeTab" />

      <ProfileSuccess :message="successMessage" />

      <div class="bg-white rounded-xl shadow-sm border p-6">

        <ProfileLoading v-if="isLoading" />

        <ProfileForm
          v-if="activeTab === 'profile' && !isLoading"
          v-model="profile"
          :saving="isSaving"
          @save="saveProfile"
        />

        <SettingsForm
          v-if="activeTab === 'settings' && !isLoading"
        />

      </div>
    </div>
  </AdminLayout>
</template>
