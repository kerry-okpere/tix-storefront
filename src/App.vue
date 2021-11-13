<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in"
    :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
import { watch, ref } from "vue";
import { useRoute } from 'vue-router'

export default {
  setup() {
    const transitionName = ref('')
    const route = useRoute()

    watch(
      () => route.name,
      ( to, from ) => {
        if(from === 'Cart' && to === 'Checkout'){
          transitionName.value = 'slideOut';
        }
        else if(from === 'Checkout' && to === 'Cart'){
          transitionName.value = 'slideIn';
        }
        else if (from === 'Home') {
          transitionName.value = 'slideOut';
        }
        else {
          transitionName.value = '';
        }
      }
    )
    return {
      transitionName
    }
  }
}
</script>
<style lang="scss">
.slideIn-leave-to,
.slideOut-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.slideIn-enter-active,
.slideOut-enter-active{
  transition: all 0.3s ease;
}
.slideIn-enter-from, 
.slideOut-leave-to{
  opacity: 0;
  transform: translateX(-100px);
}
.slideIn-leave-active,
.slideOut-leave-active{
  transition: all 0.3s ease;
}
</style>
