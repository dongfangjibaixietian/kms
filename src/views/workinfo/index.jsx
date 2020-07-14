import React from 'react'
import { observer } from 'mobx-react-lite'

import style from './index.scss'
import Top from './components/top'
import Left from './components/left'
import Right from './components/right'

// import { test } from '@/service/api'

const Test = () => {
  return (
    <div className={style.Knowledge}>
      <Top />
      <div className={style.second}>
        <Left />
        <Right />
      </div>
    </div>
  )
}

export default observer(Test)
