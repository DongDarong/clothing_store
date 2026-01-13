<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const email = ref('')
const password = ref('')
const { login } = useAuth()

const handleSubmit = () => {
  login(email.value, password.value)
}
</script>

<template>
  <div class="login-wrapper">
    <div class="form-card">
      <h2>Welcome Back</h2>
      <p class="subtitle">Sign in to your account</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="email">Email</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="name@example.com" 
            required 
          />
        </div>
        
        <div class="input-group">
          <label for="password">Password</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
        </div>

        <button type="submit" class="submit-btn">Sign In</button>
      </form>

      <p class="footer-text">
        Don't have an account? 
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 4rem;
  min-height: 100%;
}

.form-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 420px;
  text-align: center;
  border: 1px solid #f3f4f6;
}

h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
  background-color: #f9fafb;
}

input:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
  background-color: white;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background-color: #111827;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background-color: #000000;
}

.footer-text {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.footer-text a {
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
}

.footer-text a:hover {
  text-decoration: underline;
}
</style>