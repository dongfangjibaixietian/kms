import React from 'react'
import { observable, computed, action } from 'mobx'

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

const PageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "page-not-found" */ '@/components/PageNotFound'),
  loading: Loading,
})

export class RouterStore {
  @observable
  routes = [
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

  @observable
  commonRoutes = [
    {
      path: '/',
      title: '发现知识',
      component: Home,
    },
  ]

  @computed
  get currentRoutes() {
    return [
      ...this.commonRoutes,
      ...this.routes,
      {
        path: '*',
        component: PageNotFound,
      },
    ]
  }

  @action
  setRoutes = (resources) => {
    const tempRoute = []
    this.routes.forEach((item) => {
      if (resources.includes(item.name)) {
        tempRoute.push(item)
      }
    })
    this.routes = tempRoute
  }
}

export default new RouterStore()
