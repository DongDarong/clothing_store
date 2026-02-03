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

const profile = ref({
  name: '',
  email: '',
  avatarFile: null 
})

const successMessage = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const isSaving = ref(false)


// fetch profile
const fetchProfile = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await getProfile()
    profile.value = res.data.data || res.data
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Failed to load profile'
  } finally {
    isLoading.value = false
  }
}


console.log(profile.value.avatar)



// save profile
const saveProfile = async () => {
  isSaving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('name', profile.value.name)
    formData.append('email', profile.value.email)

    if (profile.value.avatarFile) {
      formData.append('avatar', profile.value.avatarFile)
    }

    await updateProfile(formData)

    successMessage.value = 'Profile updated successfully'
    setTimeout(() => (successMessage.value = ''), 3000)

  } catch (err) {
    console.error(err)

    if (err.response?.data?.errors) {
      errorMessage.value = Object.values(err.response.data.errors)
        .flat()
        .join(', ')
    } else {
      errorMessage.value = 'Failed to update profile'
    }

  } finally {
    isSaving.value = false
  }
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
