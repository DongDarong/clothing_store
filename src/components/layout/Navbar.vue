<script setup>
const logout = () => {
  localStorage.removeItem('token')
  location.href = '/login'
}

</script>
<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="font-bold text-lg">Clothing Store Admin</h1>

    <button @click="logout" class="text-red-600">
      Logout
    </button>
  </header>
</template>
