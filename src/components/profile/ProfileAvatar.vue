<script setup>
import { ref } from 'vue'

const props = defineProps(['modelValue','current'])
const emit = defineEmits(['update:modelValue'])

const preview = ref(props.current || null)

const changeAvatar = (e) => {
  const file = e.target.files[0]
  if (!file) return

  preview.value = URL.createObjectURL(file)
  emit('update:modelValue', file)
}
</script>

<template>
  <div class="flex items-center gap-4">

    <div class="h-24 w-24 rounded-xl overflow-hidden border bg-gray-100">
      <img v-if="preview" :src="preview" class="h-full w-full object-cover"/>
      <div v-else class="flex h-full items-center justify-center text-gray-400">
        IMG
      </div>
    </div>

    <label class="cursor-pointer text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
      Change Avatar
      <input type="file" hidden accept="image/*" @change="changeAvatar"/>
    </label>

  </div>
</template>
