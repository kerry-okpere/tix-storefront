import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: { 
      name: 'Home',
      params: {
        id: 'myShop'
      }
    }
  },
  {
    path: '/:id',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
