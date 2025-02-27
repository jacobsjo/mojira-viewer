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
})

if ((import.meta as any).hot) { 
  handleHotUpdate(router) 
} 

export default router
