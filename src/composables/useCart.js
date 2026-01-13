import { ref, computed, watch } from 'vue';

const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);

// Watch for changes to cart and save to LocalStorage automatically
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });

export function useCart() {
  
  const addToCart = (product) => {
    cart.value.push(product);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    cart.value.splice(index, 1);
  };

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.price, 0).toFixed(2);
  });

  const clearCart = () => {
    cart.value = [];
  };

  return { cart, addToCart, removeFromCart, cartTotal, clearCart };
}