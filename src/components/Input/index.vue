<template>
  <input :type="type" :value="modelValue" @update:modelValue="$emit('update:modelValue', $event.target.value)" >
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
        return ['text', 'email', 'tel' ].includes(value)
      }
    }
  },
  setup() {
    
  },
  emits: ['update:modelValue']
}
</script>