import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import styles from './index.scss'
import { getArticleList } from '@/services/api'
import { useRootStore } from '@/utils/customHooks'
import NoTs from './../NoTs'

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
    </div>
  )
}

export default observer(Test)
