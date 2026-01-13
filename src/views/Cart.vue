<script setup>
import { useCart } from '../composables/useCart'

const { cart, removeFromCart, cartTotal, clearCart } = useCart()
</script>

<template>
  <h2>Your Shopping Cart</h2>
  <div v-if="cart.length === 0">Your cart is empty.</div>
  
  <div v-else>
    <div class="cart-item" v-for="(item, index) in cart" :key="index">
      <span>{{ item.name }}</span>
      <span>${{ item.price }}</span>
      <button @click="removeFromCart(index)">Remove</button>
    </div>
    
    <div class="total">
      <h3>Total: ${{ cartTotal }}</h3>
      <button class="checkout" @click="clearCart">Checkout (Clear)</button>
    </div>
  </div>
</template>

<style scoped>
.cart-item { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 10px 0; }
.total { margin-top: 20px; text-align: right; }
button { background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; }
.checkout { background: #333; padding: 10px 20px; font-size: 1rem; }
</style>
