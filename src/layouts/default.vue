<template>
  <div class="relative">
    <div v-if="error || loading" class="h-screen flex justify-center items-center"> 
      <p v-if="error">Error occured while fetching this user </p>
      <p v-else-if="loading">loading... </p>
    </div>
    <section v-else class="bg-gray-200 px-4">
      <header class="pt-8 pb-24">
          <div class="flex justify-between items-center max-w-5xl mx-auto">
            <h2>By {{ user.name }}</h2>
            <h1 class=" font-extrabold text-gray-700 text-2xl capitalize">
              {{ user.storename }}
            </h1>
            <Badge :theme="user.brandColor" :value="$store.getters.countCart" @click="$router.push('/cart')" />
          </div>
          <p class="text-center text-gray-700 my-6">{{ user.description }}</p>
          <Search type="search" v-model="keyword" />
      </header>
      <section class="absolute bottom-0 inset-x-0 top-56 px-4">
        <div class="px-24 py-8 ">
          <!-- <Product v-for="product in filteredProduct" :key="product.id" @add="addToCart(product)"
          v-bind="product" :image="product.images[0]" :theme="user.brandColor"/> -->
          <Product v-for="num in 3" :key="num" @add="addToCart(products[0])"
          v-bind="products[0]" :image="products[0].images[0]" :theme="user.brandColor"/>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import Search from '@/components/Search/index.vue'
import Product from '@/components/Product/index.vue'
import Badge from '@/components/Badge/index.vue'
import { useStore } from 'vuex'

export default {
  setup(){
    const store = useStore() 
    const state = reactive({
      user: computed(() => store.state.user),
      products: computed(() => store.state.products),
      loading: false,
      error: false,
      keyword: '',
    })
    const filteredProduct = computed(() => {
        if(!state.keyword) return state.products
        return state.products.filter(({name}) => name.toLowerCase().includes(state.keyword.toLowerCase()))
      })

    // api method
    const getStore = () => {
      console.log(store.state)
      if(Object.keys(store.state.user).length < 1 || store.state.products.length < 1) fetchStore()
    }
    const fetchStore = async () => {
      state.loading = true
      state.error = false

      try {
        await store.dispatch('GET_USER')
        await store.dispatch('GET_PRODUCTS')
      } catch (error) {
        console.log(error)
        state.error = true
      }

      state.loading = false
    }
    const addToCart = product => {
      const index = store.state.cart.findIndex(({id}) => id === product.id)
      if(index >= 0) {
        store.commit('increaseProductCount', product.id)
      }else {
        store.commit('addToCart', {...product, count: 1})
      }
      console.log(store.state.cart)
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
