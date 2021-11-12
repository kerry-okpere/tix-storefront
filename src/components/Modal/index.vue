<template>
  <div>
    <transition name="fade" appear="">
      <div class="modal_backdrop" v-if="visible" @click="$emit('close')" />
    </transition>
    <transition name="pop_slide">
      <section class="modal" v-show="visible" ref="modal" :style="{width: styleWidth, zIndex: 1000}">
        <div class="modal_body">
          <slot />
        </div>
      </section>
    </transition>
  </div>  
</template>
<script>
import { ref, onMounted, watchEffect } from 'vue';
export default {
    props: {
    visible: {
      type: Boolean,
      default: false,
      required: false,
    },
    width: {
      type: String,
      default: '644px',
      required: false,
    },
  },  
  setup(props) {
    const styleWidth = ref(null)
    const modal = ref(null)
    const mediaQueryList = window.matchMedia('(min-width: 640px)');

    const setModalWidth = (condition) => {
      styleWidth.value = condition ? props.width : '100%'
    }

    onMounted(() => {
      setModalWidth()
    })

    watchEffect(() => {
      if (props.visible){
        setModalWidth(window.innerWidth >= 640)
        mediaQueryList.addEventListener('change', e => {setModalWidth(e.matches)})
      } else {
        mediaQueryList.removeEventListener('change', e => {setModalWidth(e.matches)})
      }
    })
    return {
      modal,
      styleWidth
    }
  },
  emits: ['close'],
}
</script>
<style lang="scss" scoped>
@import './_index';
</style>