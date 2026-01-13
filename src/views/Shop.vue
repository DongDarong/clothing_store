<script setup>
import { useProducts } from '../composables/useProducts'
import { useCart } from '../composables/useCart'

const { products } = useProducts()
const { addToCart } = useCart()
</script>

<template>
  <div class="shop-container">
    <div class="page-header">
      <h2>New Arrivals</h2>
      <p class="subtitle">Explore our latest collection of premium essentials.</p>
    </div>

    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="image-wrapper">
          <img :src="product.image" :alt="product.name" />
        </div>
        
        <div class="card-content">
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <span class="price">${{ product.price.toFixed(2) }}</span>
          </div>
          
          <button @click="addToCart(product)" class="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shop-container {
  padding-bottom: 2rem;
}

.page-header {
  margin-bottom: 3rem;
  text-align: center;
}

h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.subtitle {
  color: #6b7280;
  font-size: 1.1rem;
}

/* Grid Layout */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* Card Styling */
.product-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Image Handling */
.image-wrapper {
  height: 280px;
  background-color: #f3f4f6;
  position: relative;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .image-wrapper img {
  transform: scale(1.05);
}

/* Content Area */
.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.product-info {
  margin-bottom: 1.5rem;
}

.product-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #42b883; /* Brand accent color */
}

/* Button Styling */
.add-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #111827; /* Matches App/Login styling */
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.95rem;
}

.add-btn:hover {
  background-color: #000;
}
</style>