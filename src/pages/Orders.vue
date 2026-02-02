<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'

// Components
import OrdersHeader from '../components/orders/OrdersHeader.vue'
import OrdersTable from '../components/orders/OrdersTable.vue'
import CreateOrderModal from '../components/orders/CreateOrderModal.vue'
import OrderDetailsModal from '../components/orders/OrderDetailsModal.vue'

// Services
import { getOrders } from '../services/orderService'
import { getUsers } from '../services/userService'
import { getProducts } from '../services/productService'
import api from '../services/api'

// State
const orders = ref([])
const loading = ref(false)
const isUpdating = ref(false)
const selected = ref(null)
const showCreate = ref(false)

// Dependencies for Create Modal
const users = ref([])
const products = ref([])

// --- Actions ---

const fetchOrders = async () => {
  loading.value = true
  try {
    const res = await getOrders()
    orders.value = res.data.data || res.data
  } catch (error) {
    console.error('Error fetching orders:', error)
  } finally {
    loading.value = false
  }
}

const openCreateModal = async () => {
  showCreate.value = true
  // Lazy load dependencies
  if (users.value.length === 0 || products.value.length === 0) {
    try {
      const [uRes, pRes] = await Promise.all([getUsers(), getProducts()])
      users.value = uRes.data.data || uRes.data
      products.value = pRes.data.data || pRes.data
    } catch (e) {
      console.error("Error loading dependencies", e)
    }
  }
}

const handleCreate = async (formData) => {
  if (!formData.user_id || formData.items.length === 0) return
  
  isUpdating.value = true
  try {
    const payload = {
      user_id: formData.user_id,
      items: formData.items.map(i => ({
        product_id: i.product_id,
        quantity: i.quantity
      }))
    }
    await api.post('/orders', payload)
    await fetchOrders()
    showCreate.value = false
  } catch (error) {
    console.error('Failed to create order', error)
    alert('Failed to create order')
  } finally {
    isUpdating.value = false
  }
}

const handleUpdateStatus = async (status) => {
  if (!selected.value) return
  isUpdating.value = true
  try {
    await api.put(`/orders/${selected.value.id}`, { status })
    // Optimistic UI update
    selected.value.status = status
    const item = orders.value.find(o => o.id === selected.value.id)
    if (item) item.status = status
  } catch (error) {
    console.error('Failed to update status', error)
  } finally {
    isUpdating.value = false
  }
}

const handleDelete = async (id) => {
  if (!confirm('Delete this order?')) return
  try {
    await api.delete(`/orders/${id}`)
    await fetchOrders()
    if (selected.value?.id === id) selected.value = null
  } catch (error) {
    console.error('Failed to delete', error)
  }
}

onMounted(fetchOrders)
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">

      <OrdersHeader
        :totalOrders="orders.length"
        @openCreate="openCreateModal"
        @refresh="fetchOrders"
      />

      <OrdersTable
        :orders="orders"
        :isLoading="loading"
        @viewDetails="selected = $event"
        @deleteOrder="handleDelete"
      />

      <CreateOrderModal
        :show="showCreate"
        :users="users"
        :products="products"
        :isUpdating="isUpdating"
        @close="showCreate = false"
        @submit="handleCreate"
      />

      <OrderDetailsModal
        :order="selected"
        :isUpdating="isUpdating"
        @close="selected = null"
        @updateStatus="handleUpdateStatus"
        @deleteOrder="handleDelete"
      />

    </div>
  </AdminLayout>
</template>