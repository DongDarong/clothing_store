<script setup>
defineProps({
  total: Number
})
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Product Management</h1>
      <p class="text-gray-500 text-sm mt-1">
        Add, edit, and organize your store's inventory.
      </p>
    </div>

    <div class="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
      Total Products:
      <span class="font-semibold text-gray-900">{{ total }}</span>
    </div>
  </div>
</template>