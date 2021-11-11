<template>
  <div class="h-screen flex justify-center">
    <div v-if="error || loading" class="h-screen flex justify-center items-center"> 
      <p v-if="error">Error occured while fetching this user </p>
      <p v-else-if="loading">loading... </p>
    </div>
    <section v-else class="flex-1 px-4 md:px-0">
      <h1 class="text-4xl font-extrabold text-center mt-20 mb-12">Shopping Cart</h1>
      <div v-if="$store.state.cart.length < 1" class="md:w-1/3 flex flex-col items-stretch mx-auto text-center py-32">
        <p class="text-lg text-gray-700 py-8">Your Cart is Empty</p>
        <!-- use user info for link -->
        <Button title="Continue Shopping" @click="$router.push(`/${user.slug}`)" :theme="user.brandColor" />
      </div>
      
      <div class="flex flex-col items-stretch max-w-xl mx-auto" v-if="$store.state.cart.length">
        <ProductList class="w-full" v-for="(product, index) in $store.state.cart" :key="product.id" v-bind="product" 
        :amount="product.count" :theme="user.brandColor" :image="product.images[0]" :borderBottom="index === $store.state.cart.length-1"
        @add="addQuanity(product)" @reduce="reduceQuanity(product)" @removeItem="removeProduct(product)" />
        <div class="flex justify-between py-12 w-full">
          <h4 class="font-bold">Subtotal</h4>
          <p>{{ formatter.format($store.getters.totalCart) }}</p>
        </div>
        <Button title="Checkout" @click="$router.push('/checkout')" :theme="user.brandColor" />

        <div class="py-4 w-full text-center">
          or <router-link :to="`/${user.slug}`" class="font-semibold " :style="{color: user.brandColor}">Continue Shopping</router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ProductList from '@/components/ProductList/index.vue'
import Button from '@/components/Button/index.vue'
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'
import { formatter } from "@/utils/getData.js"

export default {
  setup() {
    const store = useStore() 
    const state = reactive({
      user: computed(() => store.state.user),
      loading: false,
      error: false      
    })

    const fetchUser = async () => {
      state.loading = true
      state.error = false
      try {
        await store.dispatch('GET_USER')
      } catch (error) {
        console.log(error)
        state.error = true
      }
      state.loading = false
    }
    const getUser = () => {
      if(Object.keys(store.state.user).length < 1) fetchUser()
    }
    const addQuanity = product => {
      store.commit('increaseProductCount', product.id)
    }
    const reduceQuanity = product => {
      store.commit('decreaseProductCount', product.id)
    }
    const removeProduct = product => {
      store.commit('deleteProduct', product)
    }

    getUser()
    return {
      ...toRefs(state),
      addQuanity,
      reduceQuanity,
      removeProduct,
      formatter
    }
  },
  components: {
    ProductList,
    Button
  }
}
</script>