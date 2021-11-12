<template>
  <div class="h-48 w-48 relative rounded-xl bg-gray-300 shadow-sm m-1" >
    <img class="h-full w-full rounded-xl object-cover object-center hover:opacity-75 transition" :src="image" :alt="`${name} image`">
    <div class="absolute bg-white rounded-md p-2 bottom-2 w-11/12 text-sm mx-auto inset-x-0">
      <p class="truncate text-xs text-gray-500">{{ name }}</p>
      <p class="text-sm font-bold truncate text-gray-700">{{ money }}</p>
      <div class="absolute p-1.5 rounded-full -top-3 right-3" :style="{backgroundColor: theme}" @click.stop="$emit('add')">
        <PlusIcon class="h-4 w-4 text-white"/>
      </div>
    </div>
  </div>
</template>
<script>
import { formatter } from "@/utils/getData.js";
import { computed } from 'vue';
import { PlusIcon } from '@heroicons/vue/outline'

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
    },
    theme: {
      type: String,
      default: '#FBBF24'
    }
  },
  setup(props) {
    const money = computed(() => formatter.format(props.price.value))
    return {
      money
    }
  },
  emits: ['add'],
  components: {
    PlusIcon
  }
}
</script>