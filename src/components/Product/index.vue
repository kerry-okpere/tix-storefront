<template>
  <div class="h-64 w-64 relative rounded-xl bg-gray-200 shadow-sm" @click="$router.push({ path: '/', query: { product: slug }})">
    <img class="h-full w-full rounded-lg object-cover object-center hover:opacity-75 transition" :src="image" :alt="`${name} image`">
    <div class="absolute bg-white rounded-md p-2 bottom-2 w-11/12 text-sm mx-auto inset-x-0">
      <p class="truncate text-xs text-gray-500">{{ name }}</p>
      <p class="text-sm font-bold truncate text-gray-700">{{ money }}</p>
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