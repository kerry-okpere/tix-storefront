<template>
  <div>
    <h1>Shopping Cart</h1>
    <section class="grid grid-cols-1 divide-y divide-gray-200">
      <ProductList v-for="product in products" :key="product.id" 
        v-bind="product" :image="product.images[0]"/>
    </section>
  </div>
</template>
<script>
import ProductList from '@/components/ProductList/index.vue'

export default {
  setup() {
    
  },
  components: {
    ProductList
  }
}
</script>