import React from 'react'
import { useState, useMemo } from 'react'
import Loadable from 'react-loadable'

import PageLayout from '@/components/PageLayout'
import workinfo from '../views/workinfo'

const Loading = () => <div>loading</div>

// 首页
const Knowledge = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ '@/views/Knowledge'),
  loading: Loading,
})

const AdminLayout = Loadable({
  loader: () => import(/* webpackChunkName: "admin-layout" */ '@/components/AdminLayout'),
  loading: Loading,
})

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "admin" */ '@/views/Admin'),
  loading: Loading,
})

const Test = Loadable({
  loader: () => import(/* webpackChunkName: "test" */ '@/views/workinfo'),
  loading: Loading,
})

const ArticleEditor = Loadable({
  loader: () => import(/* webpackChunkName: "test" */ '@/views/ArticleEditor'),
  loading: Loading,
})

const PageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "page-not-found" */ '@/components/PageNotFound'),
  loading: Loading,
})

// type: home/admin
const useGetRoutes = () => {
  // 首页路由
  const [homeRoutes, setHomeRoutes] = useState({
    path: '/',
    component: PageLayout,
    children: [
      {
        path: '/',
        title: '发现知识',
        component: Knowledge,
      },
      {
        path: '/workData',
        title: '工作资料',
        component: workinfo,
      },
    ],
  })

  // 管理界面路由
  const [adminRoutes, setAdminRoutes] = useState({
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        title: '首页',
        component: Admin,
      },
    ],
  })

  // 编辑
  const [editorRoutes, setEditorRoutes] = useState({
    path: 'editor',
    component: ArticleEditor,
  })

  const currentRoutes = useMemo(() => {
    return [
      adminRoutes,
      editorRoutes,
      homeRoutes,
      {
        path: '*',
        component: PageNotFound,
      },
    ]
  })

  return {
    currentRoutes,
    setAdminRoutes,
    setHomeRoutes,
    homeRoutes,
    adminRoutes,
    setEditorRoutes,
  }
}

export default useGetRoutes
