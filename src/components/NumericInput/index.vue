<template>
  <div class="bg-gray-100 flex rounded items-center px-2 w-min">
    <MinusIcon class="h-5 w-5 mr-2.5 hover:bg-gray-200 p-1 rounded-full" :style="{color: theme}" @click="handleClick('reduce')"/>
    <input class="self-stretch py-1 w-6 focus:outline-none bg-transparent" disabled min="0" max="10" type="number" :value="Number(modelValue)" >
    <PlusIcon class="h-5 w-5 hover:bg-gray-200 p-1 rounded-full" :style="{color: theme}" @click="handleClick('add')"/>
  </div>
</template>
<script>
import { PlusIcon, MinusIcon } from '@heroicons/vue/outline'

export default {
  props: {
    modelValue: {
      type: [Number, String],
      required: true
    },
    theme: {
      type: String,
      default: '#FBBF24'
    },
  },
  setup(props, { emit }) {
    const handleClick = type => {
      if(type == 'reduce' && props.modelValue > 0 ){
        emit('reduce')
        return 
      }
      if(type == 'add' && props.modelValue < 10 ){
        emit('add')
        return 
      }
    }
    return {
      handleClick
    }
  },
  emits: ['update:modelValue', 'add', 'reduce'],
  components: {
    PlusIcon, 
    MinusIcon 
  }
}
</script>
<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>