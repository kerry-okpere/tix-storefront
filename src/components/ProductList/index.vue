<template>
  <div class="bg-gray-100 rounded-lg p-3 flex space-x-4">
    <div class="h-12 w-12 relative rounded bg-gray-200">
      <img class="h-full w-full rounded object-cover object-center" :src="image" :alt="`${name} image`">
    </div>
    <div class="flex-1">
      <p class="truncate text-xs text-gray-700">{{ name }}</p>
      <div class="flex justify-between pt-2">
        <p class="text-md font-bold text-gray-700">{{ money }}</p>
       <div>
          numberic input
       </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatter } from "@/utils/getData.js";
import { computed } from 'vue';
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    price: {
      type: Object,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const money = computed(() => formatter.format(props.price.value))
    return {
      money
    }
  },
}
</script>