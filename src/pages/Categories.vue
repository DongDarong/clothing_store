<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '../services/categoryService'

const categories = ref([])

onMounted(async () => {
  try {
    const res = await getCategories()
    categories.value = res.data
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Categories</h1>

    <ul class="list-disc pl-5">
      <li v-for="c in categories" :key="c.id">
        {{ c.name }}
      </li>
    </ul>
  </div>
</template>
