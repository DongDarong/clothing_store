<script setup>
import { ref } from 'vue'

const sent = ref(false)

const submitForm = () => {
  // Simulate API call
  setTimeout(() => {
    sent.value = true
  }, 500)
}
</script>

<template>
  <div class="contact-wrapper">
    <div class="contact-card">
      <div class="header">
        <h2>Get in Touch</h2>
        <p class="subtitle">We'd love to hear from you. Send us a message!</p>
      </div>

      <div v-if="sent" class="success-message">
        <div class="icon-check">✓</div>
        <h3>Message Sent!</h3>
        <p>Thank you for contacting us. We will get back to you shortly.</p>
        <button @click="sent = false" class="reset-btn">Send another</button>
      </div>

      <form v-else @submit.prevent="submitForm">
        <div class="input-group">
          <label for="name">Your Name</label>
          <input 
            id="name"
            type="text" 
            placeholder="John Doe" 
            required 
          />
        </div>

        <div class="input-group">
          <label for="email">Email Address</label>
          <input 
            id="email"
            type="email" 
            placeholder="name@example.com" 
            required 
          />
        </div>

        <div class="input-group">
          <label for="message">Message</label>
          <textarea 
            id="message"
            placeholder="How can we help you?" 
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.contact-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3rem;
  min-height: 100%;
}

.contact-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 500px;
  border: 1px solid #f3f4f6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
}

/* Form Styles */
.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

input, textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
  background-color: #f9fafb;
  font-family: inherit;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

input:focus, textarea:focus {
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
}

.submit-btn:hover {
  background-color: #000000;
}

/* Success State */
.success-message {
  text-align: center;
  padding: 2rem 0;
  animation: fadeIn 0.3s ease-out;
}

.icon-check {
  width: 60px;
  height: 60px;
  background-color: #d1fae5;
  color: #059669;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem auto;
}

.success-message h3 {
  color: #111827;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.success-message p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.reset-btn {
  background: transparent;
  color: #42b883;
  border: none;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>