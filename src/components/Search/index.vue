<template>
  <div class="flex space-x-5 items-center shadow-md bg-white pl-6 rounded-md text-gray-400 max-w-4xl mx-auto">
    <SearchIcon class="h-4 w-4" />
    <input type="search" class="flex-1 self-stretch py-4 rounded-tr-md rounded-br-md focus:outline-none" 
      placeholder="Search..." :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" >
  </div>
  
</template>
<script>
import { SearchIcon } from '@heroicons/vue/solid'

export default {
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  setup() {
  },
  components: {
    SearchIcon
  },
  emits: ['update:modelValue']
}
</script>