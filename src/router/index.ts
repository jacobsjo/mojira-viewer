import { createRouter, createWebHistory } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { useIsMobile } from '../Mobile'

const isMobile = useIsMobile()

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (from.name === undefined && to.name === "/browse" && !isMobile.value ){
    return {path: '/', query: to.query}
  }

  if (to.name === '/browse.[key]' && to.params.key !== to.params.key.toUpperCase()) {
    to.params.key = to.params.key.toUpperCase()
    return to
  }
})

if ((import.meta as any).hot) { 
  handleHotUpdate(router) 
} 

export default router
