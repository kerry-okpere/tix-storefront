<template>
  <div @click="$router.push({ path: '/', query: { product: slug }})">
    <div>
      <img :src="image" :alt="`${name} image`">
    </div>
    <div>
      <p>{{ name }}</p>
      <p>{{ price.currency }}{{ price.value }}</p>
    </div>
  </div>
</template>
<script>
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
    }
  },
  setup() {
    
  },
}
</script>