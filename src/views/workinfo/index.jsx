import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { getUrlSearch } from '@/utils'
import { useRootStore } from '@/utils/customHooks'
import style from './index.scss'
import Top from './components/top'
import Left from './components/left'
import Right from './components/right'

// import { test } from '@/service/api'

const WorkInfo = ({ history }) => {
  const [userId, setUserId] = useState('')
  const { isLogin, userInfo } = useRootStore().userStore
  // 区分是他人还是自己用户中心
  const [isSelf, setIsSelf] = useState(false)
  useEffect(() => {
    if (window.location.search) {
      const searchInfo = getUrlSearch(window.location.search)
      setUserId(searchInfo.userId)
    }
  }, [userInfo])

  useEffect(() => {
    console.log(isLogin, '登录')
    if (!isLogin || !userInfo) return
    const hasAuth = Number(userId) === userInfo.user.id
    setIsSelf(hasAuth)
  }, [userInfo, userId])

  useEffect(() => {
    if (!isLogin && isSelf) {
      history.push('/')
    }
  }, [isLogin, isSelf])

  return (
    <div className={style.Knowledge}>
      <Top userId={userId} isSelf={isSelf} />
      <div className={style.second}>
        <Left userId={userId} isSelf={isSelf} />
        <Right userId={userId} isSelf={isSelf} />
      </div>
    </div>
  )
}

export default observer(WorkInfo)
