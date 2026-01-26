<template>
  <div>
    <nav class="bg-blue-600 text-white p-4 flex gap-4">
      <router-link to="/" class="hover:underline">Home</router-link>
      <router-link to="/categories" class="hover:underline">Categories</router-link>
      <router-link to="/products" class="hover:underline">Products</router-link>
    </nav>

    <router-view />
  </div>
</template>
