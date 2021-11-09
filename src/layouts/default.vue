<template>
  <div>
    <div v-if="error.user"> Error occured while fetching this user </div>
    <div v-else-if="loading.user"> loading... </div>
    <section v-else>
      <header>
          <h1>{{ user.storename }}</h1>
          <h2>By {{ user.name }}</h2>
          <p>{{ user.description }}</p>
      </header>
      <section>
        <Search type="search" v-model="keyword"/>
        <div v-if="error.products"> Error occured while fetching this user </div>
        <div v-else-if="loading.products"> loading... </div>
        <div v-else>
          <Products v-for="product in products" :key="product.id" 
          v-bind="product" :image="product.images[0]"/>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { getData } from "@/utils/getData.js";
import Search from '@/components/Search/index.vue'
import Products from '@/components/Products/index.vue'

export default {
  setup(){
    const state = reactive({
      user: {},
      products: [],
      loading: {
        user: false,
        products: false
      },
      error: {
        user: false,
        products: false
      },
      keyword: ''
    })

    // api method
    const getUser = async () => {
      state.loading.user = true
      state.error.user = false

      try {
        state.user = await getData('http://localhost:3000/users')
        console.log(state.user)
      } catch (error) {
        console.log(error)
        state.error.user = true
      }

      state.loading.user = false
    }
    const getProducts = async () => {
      state.loading.products = true
      state.error.products = false

      try {
        state.products = await getData('http://localhost:3000/products')
        console.log(state.products)
      } catch (error) {
        console.log(error)
        state.error.products = true
      }

      state.loading.products = false
    }

    // created
    getUser()
    getProducts()

    return {
      ...toRefs(state)
    }
  },
  components: {
    Search,
    Products
  }
}
</script>
