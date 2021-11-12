import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import store from './store'
import './assets/_base.scss'

createApp(App).use(store).use(router).mount('#app')
