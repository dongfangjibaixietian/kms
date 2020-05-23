import React from 'react'

import Loadable from 'react-loadable'

const Loading = () => <div>loading</div>

// 首页
const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
  loading: Loading,
})

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "admin" */ '@/views/Admin'),
  loading: Loading,
})

const Test = Loadable({
  loader: () => import(/* webpackChunkName: "test" */ '@/views/Test'),
  loading: Loading,
})

export const routes = [
  {
    path: '/testa',
    title: '工作资料',
    name: 'testa',
    component: Admin,
  },
  {
    path: '/testb',
    title: '测试页面',
    name: 'testb',
    component: Test,
  },
]

const commonRoutes = [
  {
    path: '/',
    title: '发现知识',
    component: Home,
  },
]

const currentRoutes = [...commonRoutes, ...routes]

export default currentRoutes
