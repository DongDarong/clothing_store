<script setup>
import { useProducts } from '../composables/useProducts'
import { useCart } from '../composables/useCart'

const { products } = useProducts()
const { addToCart } = useCart()
</script>

<template>
  <h2>Our Collection</h2>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="card">
      <img :src="product.image" alt="Product" />
      <h3>{{ product.name }}</h3>
      <p class="price">${{ product.price }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.card { border: 1px solid #ddd; padding: 15px; text-align: center; border-radius: 8px; }
.card img { max-width: 100%; border-radius: 4px; }
.price { font-weight: bold; color: #2c3e50; }
button { background: #42b983; color: white; border: none; padding: 10px; width: 100%; cursor: pointer; margin-top: 10px; }
button:hover { background: #3aa876; }
</style>
