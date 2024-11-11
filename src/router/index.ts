import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: 'goods',
          name: 'goods',
          component: () => import('../views/goods/GoodsListView.vue')
        },
        {
          path: 'goods/add',
          name: 'goodsAdd',
          component: () => import('../views/goods/GoodsAddView.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/users/UsersView.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/settings/SettingsView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
