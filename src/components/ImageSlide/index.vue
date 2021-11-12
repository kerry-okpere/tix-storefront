<template>
  <div>
    <div class="h-96 w-full max-w-sm max-h-96 rounded-xl bg-gray-300">
      <img class="h-full w-full rounded-xl object-cover object-center" :src="currentImage" :alt="`${name} product`">
    </div>
    <div class="flex space-x-2 py-4 flex-wrap">
      <div v-for="image in images.slice(0, 3)" :key="image" @click="selectedImg = image" 
        :style="{borderColor: currentImage === image ? theme : 'black'}"
        :class="['h-20 w-20 relative rounded-md bg-gray-300', {'border-2': currentImage === image}]">
        <img class="h-full w-full rounded-md object-cover object-center" :src="image" :alt="`${name} product`">
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: '#FBBF24'
    }
  },
  setup(props) {
    const selectedImg = ref('')
    const currentImage = computed(() => {
      return selectedImg.value == '' ? props.images[0] : selectedImg.value
    })

    onMounted(() => {
      console.log('handle reset')
    })

    return {
      selectedImg,
      currentImage
    }
  },
}
</script>