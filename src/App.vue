<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from './composables/useAuth'
import { useCart } from './composables/useCart'

const { currentUser, logout } = useAuth()
const { cart } = useCart()
</script>

<template>
  <div class="app-container">
    <header>
      <nav>
        <!-- Logo Area -->
        <div class="logo">
          <RouterLink to="/">VUE<strong>STORE</strong></RouterLink>
        </div>

        <!-- Navigation Links -->
        <div class="nav-links">
          <RouterLink to="/shop">Shop</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>

        <!-- Right Side: Cart & Auth -->
        <div class="user-actions">
          <RouterLink to="/cart" class="cart-btn">
            Cart
            <span v-if="cart.length > 0" class="badge">{{ cart.length }}</span>
          </RouterLink>

          <div class="divider"></div>

          <template v-if="!currentUser">
            <RouterLink to="/login" class="login-link">Login</RouterLink>
            <RouterLink to="/register" class="register-btn">Register</RouterLink>
          </template>

          <template v-else>
            <RouterLink to="/profile" class="profile-link">Profile</RouterLink>
            <button @click="logout" class="logout-btn">Logout</button>
          </template>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2024 VueStore Project</p>
    </footer>
  </div>
</template>

<style scoped>
/* Layout Container to keep footer at bottom */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

/* Logo Styling */
.logo a {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  text-decoration: none;
  letter-spacing: -0.025em;
}

.logo strong {
  color: #42b883; /* Vue Green */
}

/* Middle Navigation Links */
.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover, 
.nav-links a.router-link-active {
  color: #42b883;
}

/* Right Side Actions */
.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #e5e7eb;
}

/* Cart Button */
.cart-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #111827;
  text-decoration: none;
  font-weight: 600;
}

.badge {
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
}

/* Auth Buttons */
.login-link {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  color: #111827;
}

.register-btn {
  background-color: #111827;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.register-btn:hover {
  background-color: #000;
}

.profile-link {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  margin-right: 0.5rem;
}

.logout-btn {
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: #ef4444;
  color: white;
}

/* Main Content Area */
main {
  flex: 1; /* Pushes footer down */
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #f9fafb;
  color: #9ca3af;
  font-size: 0.875rem;
  border-top: 1px solid #e5e7eb;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    font-size: 0.9rem;
    gap: 1.5rem;
  }
  
  .user-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>