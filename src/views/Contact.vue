
<script setup>

import { ref } from 'vue'

const sent = ref(false)



const submitForm = () => {

  sent.value = true

}

</script>



<template>

  <h2>Contact Us</h2>

  <div v-if="sent" class="success">Message Sent! We will get back to you soon.</div>

  <form v-else @submit.prevent="submitForm" class="contact-form">

    <input type="text" placeholder="Your Name" required />

    <input type="email" placeholder="Your Email" required />

    <textarea placeholder="Message" required></textarea>

    <button type="submit">Send Message</button>

  </form>

</template>



<style scoped>

.contact-form { max-width: 500px; margin: 0 auto; }

input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; display: block; }

textarea { height: 100px; }

button { background: #333; color: white; padding: 10px 20px; border: none; cursor: pointer; }

.success { color: green; font-weight: bold; text-align: center; }

</style>
