<template>
  <div>
    <input type="search" :value="modelValue" @update:modelValue="$emit('update:modelValue', $event.target.value)" >
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  setup() {
    
  },
  emits: ['update:modelValue']
}
</script>