import React from 'react'
import { useState, useMemo } from 'react'
import Loadable from 'react-loadable'

import PageLayout from '@/components/PageLayout'
// import workinfo from '../views/workinfo'

const Loading = () => <div>正在加载中</div>

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

const WorkInfo = Loadable({
  loader: () => import(/* webpackChunkName: "work-info" */ '@/views/workinfo'),
  loading: Loading,
})

const ArticleEditor = Loadable({
  loader: () => import(/* webpackChunkName: "article-editor" */ '@/views/ArticleEditor'),
  loading: Loading,
})

const PageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "page-not-found" */ '@/components/PageNotFound'),
  loading: Loading,
})

const ArticleDetails = Loadable({
  loader: () => import(/* webpackChunkName: "artice-details" */ '@/views/ArticleDetails'),
  loading: Loading,
})

const OnlinehardDetails = Loadable({
  loader: () => import(/* webpackChunkName: "onlinehard-Details" */ '@/views/OnlinehardDetails'),
  loading: Loading,
})

const publishArticle = Loadable({
  loader: () => import(/* webpackChunkName: "publish-article" */ '@/views/PublicizePage'),
  loading: Loading,
})

const userAgreement = Loadable({
  loader: () => import(/* webpackChunkName: "user-agreement" */ '@/views/UserAgreement'),
  loading: Loading,
})

const userPrivacy = Loadable({
  loader: () => import(/* webpackChunkName: "user-privacy" */ '@/views/UserPrivacy'),
  loading: Loading,
})

const memberManage = Loadable({
  loader: () => import(/* webpackChunkName: "member-manage" */ '@/views/MemberManage'),
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
        title: '',
        component: Knowledge,
      },
      // {
      //   path: '/workData',
      //   title: '工作资料',
      //   component: workinfo,
      // },
      // {
      //   path:''
      // },
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

  // 编写文章
  // const [editorRoutes, setEditorRoutes] = useState({
  //   path: 'editor',
  //   component: ArticleEditor,
  // })

  const [userRoutes, setUserRoutes] = useState({
    path: '/user',
    component: PageLayout,
    children: [
      {
        path: '/center',
        title: '用户中心',
        component: WorkInfo,
      },
    ],
  })

  const [editorRoutes, setEditorRoutes] = useState({
    path: '/publish',
    component: PageLayout,
    children: [
      {
        path: '/editor',
        title: '编辑文章',
        component: ArticleEditor,
      },
    ],
  })

  // 发表文章
  const [publishRoute, setPublishArticle] = useState({
    path: 'publicize',
    component: publishArticle,
  })

  // 用户协议
  const [agreementRoutes, setAgreementRoutes] = useState({
    path: 'agreement',
    component: userAgreement,
  })

  // 用户隐私政策
  const [userPrivacyRoutes, setPrivacyRoutes] = useState({
    path: 'privacy',
    component: userPrivacy,
  })

  const [articleRoutes, setArticleRoutes] = useState({
    path: '/article',
    component: PageLayout,
    children: [
      {
        path: '/detail',
        title: '文章详情',
        component: ArticleDetails,
      },
    ],
  })

  //网盘详情路由online
  const [onlineharddetailsRoutes, setOnlineharddetailsRoutes] = useState({
    path: '/online',
    component: PageLayout,
    children: [
      {
        path: '/hard',
        title: '网盘详情',
        component: OnlinehardDetails,
      },
    ],
  })

  const [memberManageRoutes, setMemberRoutes] = useState({
    path: '/member',
    component: PageLayout,
    children: [
      {
        path: '/manage',
        title: '成员管理',
        component: memberManage,
      },
    ],
  })

  const currentRoutes = useMemo(() => {
    return [
      onlineharddetailsRoutes,
      articleRoutes,
      editorRoutes,
      adminRoutes,
      memberManageRoutes,
      userRoutes,
      agreementRoutes,
      userPrivacyRoutes,
      publishRoute,
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
    setArticleRoutes,
    setOnlineharddetailsRoutes,
    setPublishArticle,
    setAgreementRoutes,
    setPrivacyRoutes,
    setUserRoutes,
    setMemberRoutes,
  }
}

export default useGetRoutes
