<script setup>
defineProps(['message'])
</script>

<template>
  <transition>
    <div v-if="message" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
      {{ message }}
    </div>
  </transition>
</template>
