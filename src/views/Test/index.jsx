import React from 'react'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
// import { Button } from 'antd'
// import Loadable from 'react-loadable'

// import styles from './index.scss'
// import { getArticleList } from '@/services/api'
// import { useRootStore } from '@/utils/customHooks'
// import TestIcon from '@/assets/svg/test.svg'
import PageLayout from '@/components/PageLayout'

// const Loading = () => <div>loading</div>

// const PageA = Loadable({
//   loader: () => import(/* webpackChunkName: "page-a" */ '@/views/PageA'),
//   loading: Loading,
// })

// const PageB = Loadable({
//   loader: () => import(/* webpackChunkName: "page-b" */ '@/views/PageB'),
//   loading: Loading,
// })

// const Home = Loadable({
//   loader: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
//   loading: Loading,
// })

const Test = () => {
  return (
    <PageLayout />
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/" component={Home} />
    //     <Route path="/page-a" component={PageA} />
    //     <Route path="/page-b" component={PageB} />
    //   </Switch>
    // </BrowserRouter>
  )
}

export default observer(Test)
