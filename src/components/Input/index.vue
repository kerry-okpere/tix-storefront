<template>
  <div class="my-2">
    <label for="input">
      <span class="text-sm text-gray-700">{{ label }}</span>
      <input class="block w-full py-2 px-1 border rounded border-gray-300" :required="required" :type="type" :value="modelValue" name="input" @input="$emit('update:modelValue', $event.target.value)" >
    </label>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator: function(value) {
        return ['text', 'email', 'tel', 'number' ].includes(value)
      }
    },
    required: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
    }
  },
  setup() {
    
  },
  emits: ['update:modelValue']
}
</script>
<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>