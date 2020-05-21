import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'

import styles from './index.scss'
import { getArticleList } from '@/services/api'
import { useRootStore } from '@/utils/customHooks'
import NoTs from './../NoTs'
import PageA from './../PageA'
import PageB from './../PageB'

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
    // <div className={styles.test}>
    //   <div>{num}</div>
    //   <button onClick={() => setNum(num + 1)}>+</button>
    //   <div onClick={getList}>测试</div>
    //   <div>{testNum}</div>
    //   <button onClick={() => setTestNum(testNum + 1)}>+</button>
    //   <NoTs text="asdasd" />
    //   <Button type="primary">这是一个按钮</Button>
    // </div>
    <BrowserRouter>
      <Route path="/" exact component={PageA} />
      <Route path="/users" component={PageB} />
    </BrowserRouter>
  )
}

export default observer(Test)
