<script setup>
import { ref } from 'vue'

const height = ref('')
const weight = ref('')
const recommendedSize = ref(null)

const calculateSize = () => {
  if (!weight.value) return
  
  const w = parseFloat(weight.value)
  
  // Simple "computer" logic for demonstration
  if (w < 60) recommendedSize.value = 'S'
  else if (w < 75) recommendedSize.value = 'M'
  else if (w < 90) recommendedSize.value = 'L'
  else recommendedSize.value = 'XL'
}
</script>

<template>
  <div class="about-container">
    <div class="content-wrapper">
      <div class="header">
        <h1>About Us</h1>
        <p class="subtitle">Redefining student fashion, one semester at a time.</p>
      </div>

      <div class="story-section">
        <p>
          Welcome to <strong>VueStore</strong>. We were founded with a simple mission: to provide university students with high-quality, stylish clothing that doesn't break the bank.
        </p>
        <p>
          We believe that looking good shouldn't require a student loan. Our collections are curated to offer versatile essentials that transition seamlessly from the lecture hall to the weekend hangout.
        </p>
      </div>

      <div class="values-grid">
        <div class="value-card">
          <h3>Affordable</h3>
          <p>Pricing designed for student budgets.</p>
        </div>
        <div class="value-card">
          <h3>Quality</h3>
          <p>Fabrics that last longer than a semester.</p>
        </div>
        <div class="value-card">
          <h3>Style</h3>
          <p>Timeless pieces for every occasion.</p>
        </div>
      </div>

      <!-- Size Computer Section -->
      <div class="size-computer-section">
        <div class="computer-header">
          <h2>Fit Computer</h2>
          <p>Not sure what to buy? Enter your details below to calculate your fit.</p>
        </div>
        
        <div class="calculator-box">
          <div class="inputs-row">
            <div class="input-group">
              <label>Height (cm)</label>
              <input type="number" v-model="height" placeholder="e.g. 175" min="0">
            </div>
            <div class="input-group">
              <label>Weight (kg)</label>
              <input type="number" v-model="weight" placeholder="e.g. 70" min="0">
            </div>
          </div>
          
          <button @click="calculateSize" class="calc-btn">Calculate Size</button>
          
          <div v-if="recommendedSize" class="result-display">
            <p>Your recommended size:</p>
            <div class="size-badge">{{ recommendedSize }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.content-wrapper {
  max-width: 800px;
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.subtitle {
  color: #6b7280;
  font-size: 1.25rem;
}

.story-section {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  margin-bottom: 3rem;
  line-height: 1.8;
  color: #374151;
  font-size: 1.1rem;
}

.story-section p {
  margin-bottom: 1.5rem;
}

.story-section p:last-child {
  margin-bottom: 0;
}

strong {
  color: #42b883;
}

/* Values Grid */
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.value-card {
  background: #f9fafb;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.value-card:hover {
  transform: translateY(-5px);
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.value-card h3 {
  color: #111827;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.value-card p {
  color: #6b7280;
  font-size: 0.95rem;
}

/* Size Computer Styles */
.size-computer-section {
  background: #111827; /* Dark background for contrast */
  color: white;
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.computer-header h2 {
  color: white;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.computer-header p {
  color: #9ca3af;
  margin-bottom: 2rem;
}

.calculator-box {
  max-width: 500px;
  margin: 0 auto;
}

.inputs-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.input-group {
  flex: 1;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 0.875rem;
  color: #d1d5db;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  background: #1f2937;
  border: 1px solid #374151;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: #42b883;
  outline: none;
}

.calc-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background 0.2s, transform 0.1s;
}

.calc-btn:hover {
  background: #3aa876;
}

.calc-btn:active {
  transform: translateY(1px);
}

.result-display {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #374151;
  animation: fadeIn 0.5s ease;
}

.result-display p {
  color: #9ca3af;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.size-badge {
  display: inline-block;
  font-size: 4rem;
  font-weight: 800;
  color: #42b883;
  line-height: 1;
  text-shadow: 0 2px 10px rgba(66, 184, 131, 0.2);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .inputs-row {
    flex-direction: column;
  }
  
  .size-computer-section {
    padding: 2rem 1.5rem;
  }
}
</style>