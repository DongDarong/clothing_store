<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar: Fixed width, full height (Assuming Sidebar component handles its own width/styling) -->
    <!-- We add flex-shrink-0 to prevent it from shrinking when content expands -->
    <aside class="flex-shrink-0 hidden md:flex flex-col z-20">
      <Sidebar class="h-full" />
    </aside>

    <!-- Main Content Column -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      
      <!-- Sticky/Fixed Header Area -->
      <header class="flex-shrink-0 z-10 bg-white shadow-sm">
        <Navbar />
      </header>

      <!-- Scrollable Main Content -->
      <main class="flex-1 overflow-y-auto scroll-smooth">
        <!-- Content Container -->
        <div class="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <!-- Fade-in transition for page content -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <slot />
          </transition>
        </div>
      </main>
      
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
</script>