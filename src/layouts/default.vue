<template>
  <div class="relative">
    <div v-if="error.user || loading.user" class="h-screen flex justify-center items-center"> 
      <p v-if="error.user">Error occured while fetching this user </p>
      <p v-else-if="loading.user">loading... </p>
    </div>
    <section v-else class="bg-gray-200">
      <header class="pt-8 pb-24">
          <div class="flex justify-between items-center max-w-5xl mx-auto">
            <h2>By {{ user.name }}</h2>
            <h1 class=" font-extrabold text-gray-700 text-2xl capitalize">
              {{ user.storename }}
            </h1>
            <Badge :theme="user.brandColor" :value="0" />
          </div>
          <p class="text-center text-gray-700 my-6">{{ user.description }}</p>
          <Search type="search" v-model="keyword" />
      </header>
      <section class="absolute bottom-0 inset-x-0 top-56">
        <div class="px-24 py-8">
          <!-- <Product v-for="product in filteredProduct" :key="product.id" @add="addToCart(product)"
          v-bind="product" :image="product.images[0]" :theme="user.brandColor"/> -->
          <Product v-for="num in 3" :key="num" @add="addToCart(product)"
          v-bind="products[0]" :image="products[0].images[0]" :theme="user.brandColor"/>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { getData } from "@/utils/getData.js";
import Search from '@/components/Search/index.vue'
import Product from '@/components/Product/index.vue'
import Badge from '@/components/Badge/index.vue'

export default {
  setup(){
    const state = reactive({
      user: {},
      products: [],
      loading: {
        user: false,
      },
      error: {
        user: false,
      },
      keyword: '',
      
    })
    const filteredProduct = computed(() => {
        if(!state.keyword) return state.products
        return state.products.filter(({name}) => name.toLowerCase().includes(state.keyword.toLowerCase()))
      })

    // api method
    const getStore = async () => {
      state.loading.user = true
      state.error.user = false

      try {
        state.user = await getData('http://localhost:3000/users')
        state.products = await getData('http://localhost:3000/products')
      } catch (error) {
        console.log(error)
        state.error.user = true
      }

      state.loading.user = false
    }
    const addToCart = product => {
      // if product is in cart increase number 
      // add a new product if not found 
    }

    // created
    getStore()

    return {
      ...toRefs(state),
      addToCart,
      filteredProduct
    }
  },
  components: {
    Search,
    Product,
    Badge
  }
}
</script>
