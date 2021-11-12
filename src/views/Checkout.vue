<template>
  <div class="md:flex h-screen">
    <div class="px-10 bg-gray-100 py-10 text-gray-700 md:order-2 flex-1 h-full overflow-scroll" v-if="$store.state.cart.length">
      <div class="md:hidden mb-4">
        <p class="text-gray-500">Amount due</p>
        <h1 class="text-3xl font-black">
          {{ formatter.format($store.getters.totalCart + shipping + tax) }}
        </h1>
      </div>

      <h1 class="hidden md:block text-lg font-semibold ">Order Summary</h1>
      <ProductList class="w-full" v-for="(product, index) in $store.state.cart" :key="product.id" v-bind="product" isSmall
      type="list:checkout" :image="product.images[0]" :borderBottom="index === $store.state.cart.length-1" :inStockFlag="false" />
      <div class="py-6">
        <div class="flex justify-between py-1 w-full">
          <h4 class="font-bold">Subtotal</h4>
          <p>{{ formatter.format($store.getters.totalCart) }}</p>
        </div>
        <div class="flex justify-between py-1 w-full">
          <h4 class="font-bold">Shipping</h4>
          <p>{{ formatter.format(shipping) }}</p>
        </div>
        <div class="flex justify-between py-1 w-full">
          <h4 class="font-bold">Taxes</h4>
          <p>{{ formatter.format(tax) }}</p>
        </div>
        <div class="flex justify-between py-2 mt-4 w-full border-gray-200 border-t">
          <h4 class="font-bold">Total</h4>
          <p class="text-xl font-semibold">{{ formatter.format($store.getters.totalCart + shipping + tax) }}</p>
        </div>
      </div>
    </div>
    <div class="md:order-1 ">
      <form class="md:px-6 lg:px-10 xl:pr-32">
        <div class="py-2.5 text-sm text-gray-700 flex space-x-1">
          <router-link :to="`/${user.slug}`" :style="{color: user.brandColor}">Shop / </router-link> 
          <router-link to="/cart" :style="{color: user.brandColor}"> Cart </router-link> 
          <p class="text-gray-400"> / Checkout</p>
        </div>
        <h2 class="text-lg font-semibold py-4 text-gray-700">Contact Information</h2>
        <Input v-model="customer.email" type="email" label="Email address"/>
        <div>
          <h2 class="text-lg font-semibold py-4 text-gray-700">Payment Details</h2>
          <Input v-model="customer.card.name" type="text" label="Name on card"/>
          <Input v-model="customer.card.number" type="number" label="Card number"/>
          <div class="md:flex -mx-2">
            <Input class="mx-1 md:w-9/12" v-model="customer.card.date" type="text" label="Expiry date (MM/YY)"/>
            <Input class="mx-1 md:w-3/12" v-model="customer.card.cvc" type="number" label="CVC"/>
          </div>
        </div>
        <div>
          <h2 class="text-lg font-semibold py-4 text-gray-700">Shipping Address</h2>
          <Input v-model="customer.address.street" :required="false" type="text" label="Address"/>
          <div class="md:flex -mx-2">
            <Input class="mx-1 md:w-4/12" v-model="customer.address.city" type="text" label="City" />
            <Input class="mx-1 md:w-4/12" v-model="customer.address.state" type="text" label="State / province"/>
            <Input class="mx-1 md:w-4/12" v-model="customer.address.postal" :required="false" type="number" label="Postal code"/>
          </div>
        </div>
        <Button class="w-full md:w-48 float-right mt-2" :title="btnLoading ? 'loading...' : 'Pay Now'" @click="showModal" :disabled="btnLoading" :theme="user.brandColor" />
      </form>
    </div>
  </div>
</template>
<script>
import ProductList from '@/components/ProductList/index.vue'
import Button from '@/components/Button/index.vue'
import Input from '@/components/Input/index.vue'
import { onMounted, reactive, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { formatter } from "@/utils/getData.js"

export default {
  setup() {
    const router = useRouter()
    const store = useStore() 
    const state = reactive({
      user: computed(() => store.state.user), 
      btnLoading: false,
      visible: false,
      tax: 50,
      shipping: 1500,
      customer: {
        name: '',
        email: '',
        card: {
          name: '',
          number: '',
          date: '',
          cvc: ''
        },
        address: {
          street: '',
          state: '',
          city: '',
          postal: '',

        }
      }

    })

    const showModal = () => {
      state.btnLoading = true

      setTimeout(() => {
        state.btnLoading = false
        state.visible = true
      }, 2000);
    }
    
    onMounted(() => {
      if(store.state.cart.length < 1) {
        router.push(`/my-shop`)
      }
    })

    return {
      ...toRefs(state),
      formatter,
      showModal
    }
  },
  components: {
    ProductList,
    Button,
    Input
  }
}
</script>
