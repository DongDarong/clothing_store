<script setup>
import ProfileAvatar from './ProfileAvatar.vue'

defineProps(['modelValue','saving'])
const emit = defineEmits(['update:modelValue','save'])
</script>

<template>
  <form @submit.prevent="emit('save')" class="space-y-6">

    <ProfileAvatar
      :current="modelValue.avatar
        ? 'http://127.0.0.1:8000/storage/' + modelValue.avatar
        : null"
      @update:modelValue="file =>
        emit('update:modelValue',{...modelValue,avatar:file})"
    />

    <div>
      <label>Name</label>
      <input
        :value="modelValue.name"
        @input="e=>emit('update:modelValue',{...modelValue,name:e.target.value})"
        class="w-full border rounded-lg px-4 py-2"
      />
    </div>

    <div>
      <label>Email</label>
      <input
        :value="modelValue.email"
        @input="e=>emit('update:modelValue',{...modelValue,email:e.target.value})"
        class="w-full border rounded-lg px-4 py-2"
      />
    </div>

    <button
      type="submit"
      :disabled="saving"
      class="bg-indigo-600 text-white px-6 py-2 rounded-lg flex gap-2"
    >
      Save Profile
    </button>

  </form>
</template>
