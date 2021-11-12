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
        <div class="products px-2 md:px-8 lg:px-16 py-8 max-w-5xl">
          <Product class="mx-auto" v-for="product in filteredProduct" :key="product.id" @add="increaseCartBy(product, 1)"
          v-bind="product" :image="product.images[0]" :theme="user.brandColor" @click="showProduct(product)"/>
        </div>
      </section>
    </section>

    <Modal :visible="visible" width="800px" @close="closeModal">
      <div v-if="currentProduct.name"
        class="md:flex max-h-96 md:max-h-full overflow-scroll md:overflow-x-auto px-6 py-4" >
        <div class="md:order-2">
          <h2 class="text-gray-700 text-3xl font-bold">{{ currentProduct.name }}</h2>
          <h2 class="capitalize text-xs">  
            <span class="text-gray-400">By </span>
            <span :style="{color: user.brandColor}" class="py-4"> {{ user.name }}</span>
          </h2>
          <div class="py-4">
            <p> {{ currentProduct.description }} </p>
          </div>
          <p class="text-xl font-bold py-2" :style="{color: user.brandColor}"> 
            {{ formatter.format(currentProduct.price.value) }} 
          </p>
          <div class="flex space-x-3 py-2">
            <NumericInput @add="count++" @reduce="count--" :modelValue="count" :theme="user.brandColor" />
            <Button :theme="user.brandColor" title="Add to cart" @click="increaseBy(currentProduct, count)" />
          </div>
        </div>
        <ImageSlide class="md:order-1 md:w-7/12" v-bind="currentProduct" :theme="user.brandColor" />
      </div>
    </Modal>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import Search from '@/components/Search/index.vue'
import Product from '@/components/Product/index.vue'
import ImageSlide from '@/components/ImageSlide/index.vue'
import Badge from '@/components/Badge/index.vue'
import Modal from '@/components/Modal/index.vue'
import NumericInput from '@/components/NumericInput/index.vue'
import Button from '@/components/Button/index.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { formatter } from "@/utils/getData.js"

export default {
  setup(){
    const route = useRoute()
    const store = useStore() 
    const router = useRouter()

    const state = reactive({
      user: computed(() => store.state.user),
      products: computed(() => store.state.products),
      loading: false,
      error: false,
      keyword: '',
      visible: false,
      currentProduct: {},
      count: 1
    })
    const filteredProduct = computed(() => {
      if(!state.keyword) return state.products
      return state.products.filter(({name}) => name.toLowerCase().includes(state.keyword.toLowerCase()))
    })

    const getStore = () => {
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

      getProductDetails()
      state.loading = false
    }
    const increaseBy = (product, count=1) => {
      increaseCartBy(product, count)
      closeModal()
    }
    const increaseCartBy = (product, count) => {
      const index = store.state.cart.findIndex(({id}) => id === product.id)
      if(index >= 0) {
        store.commit('increaseCartBy', {
          id: product.id,
          count
        })
      }else {
        store.commit('addToCart', {...product, count})
      }
    }
    const showProduct = product => {
      state.count = 1
      state.currentProduct = {...product}
      router.push({ path: '/', query: { product: product.slug }})
      state.visible = true
    }
    const getProductDetails = () => {
      if(route.query.product == undefined) return

      const index = state.products.findIndex(({slug}) => slug === route.query.product)
      if (index >= 0){
        showProduct(state.products[index])
      }
    }
    const closeModal = () => {
      router.push('/')
      state.visible = false
      state.currentProduct = {}
    }

    // created
    getStore()

    return {
      ...toRefs(state),
      filteredProduct,
      showProduct,
      increaseBy,
      increaseCartBy,
      closeModal,
      formatter,
    }
  },
  components: {
    Search,
    Product,
    Badge,
    Modal,
    ImageSlide,
    Button,
    NumericInput
  }
}
</script>
<style lang="scss">
.products{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  grid-gap: 1rem;
  margin: 0 auto;
}
</style>
