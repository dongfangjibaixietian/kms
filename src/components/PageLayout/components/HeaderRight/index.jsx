import React, { useState } from 'react'
import { Input } from 'antd'
import { withRouter } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'

import style from './index.scss'
import LoginModal from './../LoginModal'
import { useRootStore } from '@/utils/customHooks'

const HeaderRight = ({ history }) => {
  const { userInfo } = useRootStore().userStore

  const [isShowModal, setIsShowModal] = useState(false)

  // 1: 登录 2: 注册
  const [type, setType] = useState(1)

  const triggerShowModal = (type) => {
    setType(type)
    setIsShowModal(true)
  }

  return (
    <div className={style.headerRight}>
      <Input
        className={style.searchInput}
        placeholder="搜索"
        suffix={<SearchOutlined style={{ color: 'rgba(201, 201, 201)', fontSize: 20 }} />}
      />
      {/* <div onClick={() => triggerShowModal(1)} className={style.loginBtn}>
        登录
      </div> */}
      {/* <div onClick={() => triggerShowModal(2)} className={style.loginBtn}>
        注册
      </div> */}
      {!!userInfo ? (
        <div onClick={() => history.push('/admin')}>进入admin</div>
      ) : (
        <table>
          <div onClick={() => triggerShowModal(1)} className={style.loginBtn}>
            登录
          </div>
          <div onClick={() => triggerShowModal(2)} className={style.loginBtn}>
            注册
          </div>
        </table>
      )}
      <LoginModal type={type} setIsShowModal={setIsShowModal} visible={isShowModal} />
    </div>
  )
}

export default withRouter(observer(HeaderRight))
