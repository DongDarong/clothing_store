<script setup>
defineProps({
  name: String,
  editing: Boolean,
  saving: Boolean
})

const emit = defineEmits(['update:name', 'save', 'cancel'])
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
    <h2 class="text-lg font-bold text-gray-900 mb-4">
      {{ editing ? 'Edit Category' : 'Add New Category' }}
    </h2>

    <div class="space-y-4">
      <input
        :value="name"
        @input="e => emit('update:name', e.target.value)"
        type="text"
        placeholder="Category name"
        class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        :disabled="saving"
        @keyup.enter="$emit('save')"
      />

      <div class="flex gap-2">
        <button
          @click="$emit('save')"
          :disabled="saving"
          class="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex justify-center items-center gap-2"
        >
          <span v-if="saving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ editing ? 'Update' : 'Create' }}
        </button>

        <button
          v-if="editing"
          @click="$emit('cancel')"
          :disabled="saving"
          class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>