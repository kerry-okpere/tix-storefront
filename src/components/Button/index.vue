<template>
  <button :class="['py-3 px-6 rounded font-semibold text-white hover:opacity-90 transition', {'cursor-not-allowed': disabled}]" :style="{backgroundColor: theme}" :disabled="disabled">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: '#FBBF24'
    },
  }
}
</script>
