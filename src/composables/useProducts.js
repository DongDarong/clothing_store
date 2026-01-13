import { ref } from 'vue';

export function useProducts() {
  const products = ref([
    { id: 1, name: 'Vintage Denim Jacket', price: 59.99, image: 'https://placehold.co/200?text=Jacket' },
    { id: 2, name: 'Cotton T-Shirt', price: 19.99, image: 'https://placehold.co/200?text=T-Shirt' },
    { id: 3, name: 'Slim Fit Jeans', price: 45.00, image: 'https://placehold.co/200?text=Jeans' },
    { id: 4, name: 'Summer Dress', price: 35.50, image: 'https://placehold.co/200?text=Dress' },
    { id: 5, name: 'Running Sneakers', price: 80.00, image: 'https://placehold.co/200?text=Sneakers' },
    { id: 6, name: 'Wool Beanie', price: 15.00, image: 'https://placehold.co/200?text=Beanie' },
  ]);

  return { products };
}