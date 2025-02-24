import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import WelcomeView from '../components/WelcomeView.vue'
import IssueView from '../components/IssueView.vue'
import AboutView from '../components/AboutView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'empty',
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
