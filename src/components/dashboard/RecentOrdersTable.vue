<script setup>
defineProps({ orders: Array })
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
      <h2 class="text-lg font-bold text-gray-900">Recent Orders</h2>
    </div>

    <table class="w-full text-sm text-gray-600">
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td class="px-6 py-4 font-medium text-gray-900">{{ o.id }}</td>
          <td class="px-6 py-4">{{ o.customer }}</td>
          <td class="px-6 py-4">{{ o.date }}</td>
          <td class="px-6 py-4">{{ o.status }}</td>
          <td class="px-6 py-4 text-right">{{ o.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
