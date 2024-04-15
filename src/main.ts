import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import VueDirective from '@ileostar/v3-directives'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(pinia)
app.use(VueDirective)
app.mount('#app')
