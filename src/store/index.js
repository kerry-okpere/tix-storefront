import { createStore } from 'vuex'
import data from "../data";

export default createStore({
  state: {
    cart: [
    ],
    products: [],
    user: {},
  },
  getters: {
    countCart: (state) => {
      let count = 0
      state.cart.forEach(product => {
        count = count + product.count
      })
      return count
    },
    totalCart: (state) => {
      let total = 0
      state.cart.forEach(product => {
        total = total + (product.count * Number(product.price.value))
      })
      return total
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setProducts(state, products){
      state.products = products
    },
    addToCart(state, product) {
      state.cart.push(product)
    },
    increaseCartBy(state, payload){
      const { id, count } = payload
      const index = state.cart.findIndex(product => product.id === id)
      if(index >= 0) {
        state.cart[index].count = state.cart[index].count + count
      }
    },
    deleteProduct(state, product) {
      state.cart = state.cart.filter(({id}) => id !== product.id)
    },
    clearCart(state){
      state.cart = []
    }
  },
  actions: {
    GET_USER({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('setUser', data.users.data)
          resolve(data.users.data);
        }, 500);
      });
    },
    GET_PRODUCTS({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('setProducts', data.products.data)
          resolve(data.products.data);
        }, 500);
      });
    }
  },
  modules: {
  }
})
