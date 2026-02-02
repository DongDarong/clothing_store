<script setup>
import { ref } from 'vue'

const password = ref('')
const confirm = ref('')
</script>

<template>
  <div class="space-y-6">

    <div>
      <label class="text-sm font-medium">New Password</label>
      <input v-model="password" type="password" class="w-full border rounded-lg px-4 py-2 mt-1"/>
    </div>

    <div>
      <label class="text-sm font-medium">Confirm Password</label>
      <input v-model="confirm" type="password" class="w-full border rounded-lg px-4 py-2 mt-1"/>
    </div>

    <button class="bg-indigo-600 text-white px-6 py-2 rounded-lg">
      Save Settings
    </button>

  </div>
</template>
