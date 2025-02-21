import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import EmptyView from '../components/EmptyView.vue'
import IssueView from '../components/IssueView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'empty',
    component: EmptyView
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
