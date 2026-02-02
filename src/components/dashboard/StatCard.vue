<script setup>
defineProps({
  stat: Object,
  index: Number
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-gray-500 text-sm font-medium">{{ stat.title }}</h3>
      <div :class="`p-2 rounded-lg ${stat.iconColor}`">
        <slot name="icon" />
      </div>
    </div>

    <div class="flex items-baseline gap-2">
      <span class="text-2xl font-bold text-gray-900">{{ stat.value }}</span>
      <span
        class="text-xs font-medium"
        :class="stat.trend === 'up' ? 'text-green-600' :
                stat.trend === 'down' ? 'text-red-600' :
                'text-gray-500'"
      >
        {{ stat.change }}
      </span>
    </div>

    <p class="text-xs text-gray-400 mt-1">from last month</p>
  </div>
</template>
