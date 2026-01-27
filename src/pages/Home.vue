<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'

const stats = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up', iconColor: 'bg-green-50 text-green-600' },
  { title: 'Total Orders', value: '2,345', change: '+15%', trend: 'up', iconColor: 'bg-blue-50 text-blue-600' },
  { title: 'Total Products', value: '450', change: '+5', trend: 'neutral', iconColor: 'bg-indigo-50 text-indigo-600' },
  { title: 'Pending Support', value: '12', change: '-2', trend: 'down', iconColor: 'bg-orange-50 text-orange-600' }
]

const recentOrders = [
  { id: '#ORD-001', customer: 'Sarah Smith', date: 'Oct 24, 2023', status: 'Completed', amount: '$120.00' },
  { id: '#ORD-002', customer: 'Michael Brown', date: 'Oct 24, 2023', status: 'Processing', amount: '$75.50' },
  { id: '#ORD-003', customer: 'James Wilson', date: 'Oct 23, 2023', status: 'Pending', amount: '$350.00' },
  { id: '#ORD-004', customer: 'Emily Davis', date: 'Oct 23, 2023', status: 'Completed', amount: '$60.00' },
]
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          Download Report
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(stat, index) in stats" :key="index" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm font-medium">{{ stat.title }}</h3>
            <div :class="`p-2 rounded-lg ${stat.iconColor}`">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path v-if="index === 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 <path v-if="index === 1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                 <path v-if="index === 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                 <path v-if="index === 3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 9.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
               </svg>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-bold text-gray-900">{{ stat.value }}</span>
            <span class="text-xs font-medium" :class="stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'">
              {{ stat.change }}
            </span>
          </div>
          <p class="text-xs text-gray-400 mt-1">from last month</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Orders (Spans 2 columns) -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2 flex flex-col">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-900">Recent Orders</h2>
            <a href="#" class="text-sm text-indigo-600 font-medium hover:text-indigo-800">View All</a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-600">
              <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th class="px-6 py-3">Order ID</th>
                  <th class="px-6 py-3">Customer</th>
                  <th class="px-6 py-3">Date</th>
                  <th class="px-6 py-3">Status</th>
                  <th class="px-6 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 font-medium text-gray-900">{{ order.id }}</td>
                  <td class="px-6 py-4">{{ order.customer }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ order.date }}</td>
                  <td class="px-6 py-4">
                    <span 
                      class="px-2.5 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-700': order.status === 'Completed',
                        'bg-yellow-100 text-yellow-700': order.status === 'Processing',
                        'bg-gray-100 text-gray-700': order.status === 'Pending',
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right font-medium text-gray-900">{{ order.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick Actions / Mini Widget -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div class="space-y-3">
             <button class="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all group text-left">
               <div class="bg-gray-100 group-hover:bg-white p-2 rounded-md">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
               </div>
               <span class="font-medium text-sm text-gray-700 group-hover:text-indigo-700">Add New Product</span>
             </button>
             <button class="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all group text-left">
               <div class="bg-gray-100 group-hover:bg-white p-2 rounded-md">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
               </div>
               <span class="font-medium text-sm text-gray-700 group-hover:text-indigo-700">Manage Orders</span>
             </button>
             <button class="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all group text-left">
               <div class="bg-gray-100 group-hover:bg-white p-2 rounded-md">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               </div>
               <span class="font-medium text-sm text-gray-700 group-hover:text-indigo-700">View Earnings</span>
             </button>
          </div>
          
          <div class="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h4 class="text-sm font-bold text-blue-800 mb-1">System Status</h4>
            <p class="text-xs text-blue-600 mb-2">All systems running smoothly.</p>
            <div class="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden">
               <div class="bg-blue-500 h-full w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>