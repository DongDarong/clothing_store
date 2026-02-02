<script setup>
const props = defineProps({
  user: Object
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
<tr class="hover:bg-gray-50 transition group">

  <td class="px-6 py-4">
    <div class="flex items-center gap-3">
      <div class="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold uppercase">
        {{ user.name.charAt(0) }}
      </div>
      <span class="font-medium text-gray-900">
        {{ user.name }}
      </span>
    </div>
  </td>

  <td class="px-6 py-4 text-gray-600">
    {{ user.email }}
  </td>

  <td class="px-6 py-4">
    <span
      class="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
      :class="user.role === 'admin'
        ? 'bg-purple-100 text-purple-700'
        : 'bg-gray-100 text-gray-700'"
    >
      {{ user.role || 'user' }}
    </span>
  </td>

  <td class="px-6 py-4 text-right">
    <div class="flex gap-2 justify-end">

      <button
        @click="emit('edit', user)"
        class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
      >
        Edit
      </button>

      <button
        @click="emit('delete', user.id)"
        class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
      >
        Delete
      </button>

    </div>
  </td>

</tr>
</template>