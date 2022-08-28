import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/home',
        name: '主页',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '主页' },
      },
      {
        path: '/mattersHandle',
        name: '事项处理',
        component: () => import('@/views/matters-handle.vue'),
        meta: { title: '事项处理' },
      },
      {
        path: '/mattersList',
        name: '事项列表',
        component: () => import('@/views/matters-list.vue'),
        meta: { title: '事项列表' },
      },
      {
        path: '/userList',
        name: '用户列表',
        component: () => import('@/views/user-list.vue'),
        meta: { title: '用户列表' },
      },
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login.vue'),
    meta: { title: '登录' },
  }
]

const router = new VueRouter({
  routes
})

export default router
