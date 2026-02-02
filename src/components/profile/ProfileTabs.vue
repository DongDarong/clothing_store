<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex gap-6 border-b">
    <button
      @click="emit('update:modelValue','profile')"
      :class="modelValue==='profile'
        ? 'border-indigo-600 text-indigo-600'
        : 'border-transparent text-gray-500'"
      class="pb-3 border-b-2 font-medium text-sm"
    >
      Profile
    </button>

    <button
      @click="emit('update:modelValue','settings')"
      :class="modelValue==='settings'
        ? 'border-indigo-600 text-indigo-600'
        : 'border-transparent text-gray-500'"
      class="pb-3 border-b-2 font-medium text-sm"
    >
      Settings
    </button>
  </div>
</template>
