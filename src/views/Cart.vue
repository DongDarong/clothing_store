<script setup>
import { useCart } from '../composables/useCart'

const { cart, removeFromCart, cartTotal, clearCart } = useCart()
</script>

<template>
  <div class="cart-wrapper">
    <div class="cart-container">
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <span class="item-count">{{ cart.length }} items</span>
      </div>

      <div v-if="cart.length === 0" class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <router-link to="/shop" class="continue-btn">Start Shopping</router-link>
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div class="cart-item" v-for="(item, index) in cart" :key="index">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-price">${{ item.price.toFixed(2) }}</p>
            </div>

            <button @click="removeFromCart(index)" class="remove-btn" title="Remove item">
              Remove
            </button>
          </div>
        </div>
        
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ cartTotal }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div class="divider"></div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${{ cartTotal }}</span>
          </div>
          
          <button class="checkout-btn" @click="clearCart">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-wrapper {
  padding-top: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.cart-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
}

.cart-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.item-count {
  color: #6b7280;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: #111827;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.continue-btn {
  display: inline-block;
  background-color: #111827;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.continue-btn:hover {
  background-color: #000;
}

/* Cart Items List */
.cart-content {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .cart-content {
    flex-direction: row;
  }
}

.cart-items {
  flex: 1;
  padding: 0 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f3f4f6;
  gap: 1.5rem;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  background-color: #f9fafb;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.item-price {
  color: #6b7280;
  font-weight: 500;
}

.remove-btn {
  background: transparent;
  color: #ef4444;
  border: none;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 0.9rem;
}

.remove-btn:hover {
  text-decoration: underline;
}

/* Summary Section */
.cart-summary {
  background-color: #f9fafb;
  padding: 2rem;
  min-width: 300px;
  border-left: 1px solid #f3f4f6;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #4b5563;
  font-size: 0.95rem;
}

.summary-row.total {
  color: #111827;
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 1.5rem 0;
}

.checkout-btn {
  width: 100%;
  background-color: #42b883; /* Brand Green */
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background-color: #3aa876;
}
</style>