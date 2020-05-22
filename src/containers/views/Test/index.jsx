import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'
import Loadable from 'react-loadable'

import styles from './index.scss'
import { getArticleList } from '@/services/api'
import { useRootStore } from '@/utils/customHooks'
import NoTs from './../NoTs'
import TestIcon from '@/assets/svg/test.svg'

const Loading = () => <div>loading</div>

const PageA = Loadable({
  loader: () => import(/* webpackChunkName: "page-a" */ '@/containers/views/PageA'),
  loading: Loading,
})

const PageB = Loadable({
  loader: () => import(/* webpackChunkName: "page-b" */ '@/containers/views/PageB'),
  loading: Loading,
})

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ '@/containers/views/Home'),
  loading: Loading,
})

const Test = () => {
  const { testNum, setTestNum } = useRootStore().testStore

  const [num, setNum] = useState(0)

  const getList = async () => {
    try {
      const res = await getArticleList()
      console.log(res)
    } catch (error) {}
  }

  return (
    <div className={styles.test}>
      <div>{num}</div>
      <button onClick={() => setNum(num + 1)}>+</button>
      <div onClick={getList}>测试</div>
      <div>{testNum}</div>
      <button onClick={() => setTestNum(testNum + 1)}>+</button>
      <NoTs text="asdasd" />
      <Button type="primary">这是一个按钮</Button>
      <TestIcon color={'red'} height={30} width={30} />
      <img src={require('@/assets/img/test.png').default} alt="" />
    </div>
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
