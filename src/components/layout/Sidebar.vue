<template>
  <aside class="w-64 bg-gray-800 text-white min-h-screen p-4">
    <h2 class="text-xl font-bold mb-6">Admin Panel</h2>

    <nav class="space-y-3">
      <router-link
        to="/"
        class="block p-2 rounded hover:bg-gray-700"
      >
        Dashboard
      </router-link>

            <router-link
        to="/categories"
        class="block p-2 rounded"
        active-class="bg-gray-700"
      >
        Categories
      </router-link>

      <router-link
        to="/products"
        class="block p-2 rounded hover:bg-gray-700"
      >
        Products
      </router-link>
    </nav>
  </aside>
</template>
