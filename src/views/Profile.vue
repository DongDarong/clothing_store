<script setup>
import { computed } from 'vue'
import { useAuth } from '../composables/useAuth'

const { currentUser, logout } = useAuth()

// Helper to get initials from the name (e.g., "John Doe" -> "JD")
const initials = computed(() => {
  if (!currentUser.value || !currentUser.value.name) return 'U'
  return currentUser.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<template>
  <div class="profile-container" v-if="currentUser">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar-circle">
          {{ initials }}
        </div>
        <h2>{{ currentUser.name }}</h2>
        <p class="email">{{ currentUser.email }}</p>
      </div>

      <div class="divider"></div>

      <div class="info-section">
        <h3>Account Details</h3>
        <div class="info-row">
          <span class="label">Member since</span>
          <span class="value">January 2024</span>
        </div>
        <div class="info-row">
          <span class="label">Status</span>
          <span class="status-badge">Active</span>
        </div>
      </div>

      <button @click="logout" class="logout-btn">
        Sign Out
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}

.profile-card {
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  overflow: hidden;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  background-color: #f9fafb;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  background-color: #111827;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.email {
  color: #6b7280;
  margin-top: 0.25rem;
  font-size: 0.95rem;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
}

.info-section {
  padding: 2rem;
}

h3 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  margin-bottom: 1rem;
  font-weight: 600;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.label {
  color: #374151;
  font-weight: 500;
}

.value {
  color: #111827;
  font-weight: 600;
}

.status-badge {
  background-color: #d1fae5;
  color: #065f46;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.logout-btn {
  width: 100%;
  padding: 1rem;
  background-color: white;
  color: #ef4444;
  border: none;
  border-top: 1px solid #e5e7eb;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.logout-btn:hover {
  background-color: #fef2f2;
}
</style>