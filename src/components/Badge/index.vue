<template>
  <div class="flex items-center space-x-3 px-4 py-2 rounded text-white" :style="{backgroundColor: theme}">
    <ShoppingBagIcon class="h-5 w-5 " />
    <p>{{ value }}</p>
  </div>
</template>
<script>
import { ShoppingBagIcon } from '@heroicons/vue/outline'

export default {
  props: {
    theme: {
      type: String,
      default: '#FBBF24'
    },
    value: {
      type: Number,
      default: 0
    }
  },
  setup() {
    
  },
  components: {
    ShoppingBagIcon
  }
}
</script>