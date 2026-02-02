<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import StatsGrid from '../components/dashboard/StatsGrid.vue'
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable.vue'
import QuickActions from '../components/dashboard/QuickActions.vue'
import { getOrders } from '../services/orderService'

const stats = ref([])
const recentOrders = ref([])

const fetchDashboard = async () => {
  const res = await getOrders()
  const orders = res.data

  // total revenue
  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0)

  stats.value = [
    { title: 'Total Revenue', value: `$${revenue.toFixed(2)}`, change: '', trend: 'up', iconColor: 'bg-green-50 text-green-600' },
    { title: 'Total Orders', value: orders.length, change: '', trend: 'up', iconColor: 'bg-blue-50 text-blue-600' },
    { title: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, change: '', trend: 'neutral', iconColor: 'bg-orange-50 text-orange-600' },
    { title: 'Completed Orders', value: orders.filter(o => o.status === 'completed').length, change: '', trend: 'up', iconColor: 'bg-indigo-50 text-indigo-600' }
  ]

  recentOrders.value = orders.slice(0, 5).map(o => ({
    id: `#${o.id}`,
    customer: o.user?.name ?? 'Unknown',
    date: new Date(o.created_at).toLocaleDateString(),
    status: o.status,
    amount: `$${o.total}`
  }))
}

onMounted(fetchDashboard)
</script>


<template>
  <AdminLayout>
    <div class="space-y-6">

      <StatsGrid :stats="stats" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrdersTable :orders="recentOrders" />
        <QuickActions />
      </div>

    </div>
  </AdminLayout>
</template>
