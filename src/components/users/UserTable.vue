<script setup>
import UserRow from './UserRow.vue'
import UserEmpty from './UserEmpty.vue'
import UserLoading from './UserLoading.vue'

const props = defineProps({
  users: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[500px] overflow-hidden">
    
    <!-- Component Header -->
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
      <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">User Directory</h3>
      <div v-if="users.length > 0 && !loading" class="text-xs text-gray-400 font-medium">
        {{ users.length }} members
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <UserLoading />
    </div>

    <!-- Empty State -->
    <div v-else-if="users.length === 0" class="flex-1 flex items-center justify-center">
      <UserEmpty />
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
              User Profile
            </th>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Email Address
            </th>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Access Level
            </th>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
              Management
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <UserRow
            v-for="u in users"
            :key="u.id"
            :user="u"
            @edit="emit('edit', $event)"
            @delete="emit('delete', $event)"
          />
        </tbody>
      </table>
    </div>

    <!-- Footer / Pagination Placeholder -->
    <div v-if="users.length > 0 && !loading" class="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
      <p class="text-xs text-gray-400">
        Showing all registered accounts
      </p>
    </div>
  </div>
</template>