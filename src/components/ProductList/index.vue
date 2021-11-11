<template>
  <div :class="['flex flex-wrap border-gray-200 py-4', borderBottom ? 'border-b border-t' : 'border-t']">
    <div :class="['relative rounded bg-gray-200 mr-2', isSmall ? 'h-24 w-20' : 'h-36 w-32']">
      <img class="h-full w-full rounded object-cover object-center" :src="image" :alt="`${name} image`">
    </div>
    <div class="flex-1 flex flex-col text-md text-gray-700 font-normal justify-between ml-2">
      <div class="flex justify-between flex-wrap">
        <div>
          <p class="truncate w-56">{{ name }}</p>
          <p class="capitalize text-gray-400 text-sm">Category: {{category || 'Nil'}}</p>
          <div class="text-sm" v-if="inStockFlag">
            <CheckIcon class="h-5 w-5 text-green-500 inline-block" />
            In Stock
          </div>
        </div>
        <p class="font-semibold">{{ money }}</p>
      </div>
      <div class="flex justify-between pt-2 flex-wrap" v-if="type == 'list:cart'">
        <NumericInput @add="$emit('add')" @reduce="$emit('reduce')" :modelValue="amount" :theme="theme" />
        <p class="cursor-pointer" :style="{color: theme}" @click="$emit('removeItem')">Remove</p>
      </div>
    </div>
  </div>
</template>
<script>
import { formatter } from "@/utils/getData.js";
import { computed } from 'vue';
import { CheckIcon } from '@heroicons/vue/outline'
import NumericInput from '@/components/NumericInput/index.vue'

export default {
  props: {
    amount: {
      type: Number,
      required: false
    },
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
    category: {
      type: String,
    },
    theme: {
      type: String,
      default: '#FBBF24'
    },
    borderBottom: {
      type: Boolean,
      default: false
    },
    inStockFlag: {
      type: Boolean,
      default: true
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'list:cart',
      validator: function(value){
        return ['list:cart', 'list:checkout'].includes(value)
      }
    }
  },
  setup(props) {
    const money = computed(() => formatter.format(props.price.value))
    return {
      money
    }
  },
  emits: ['add', 'reduce', 'removeItem'],
  components: {
    CheckIcon,
    NumericInput
  }
}
</script>