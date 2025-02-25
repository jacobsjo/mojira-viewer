import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import WelcomeView from '../components/WelcomeView.vue'
import IssueView from '../components/IssueView.vue'
import AboutView from '../components/AboutView.vue'
import SearchResults from '../components/SearchResults.vue'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
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
  if (from.name === undefined && to.name === 'browse' && width.value > 800 ){
    return {name: 'welcome', query: to.query}
  }
})

export default router
