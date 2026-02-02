<script setup>
import StatCard from './StatCard.vue'

defineProps({ stats: Array })
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard
      v-for="(stat, i) in stats"
      :key="i"
      :stat="stat"
      :index="i"
    />
  </div>
</template>
