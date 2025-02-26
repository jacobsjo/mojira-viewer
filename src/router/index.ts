import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import IssueView from '../components/IssueView.vue'
import AboutView from '../components/AboutView.vue'
import SearchResults from '../components/SearchResults.vue'
import { useWindowSize } from '@vueuse/core'
import { useIsMobile } from '../Mobile'

const isMobile = useIsMobile()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/browse/:issue',
    name: 'issue',
    component: IssueView
  },
  {
    path: '/browse',
    name: 'browse',
    component: SearchResults
  },


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  if (from.name === undefined && to.name === 'browse' && !isMobile.value ){
    return {name: 'home', query: to.query}
  }
})

export default router
