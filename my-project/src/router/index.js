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
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
