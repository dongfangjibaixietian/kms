import React, { useState } from 'react'
import { Modal, Input } from 'antd'

import { creatUser as creatUserApi, login as loginApi } from '@/service/api'
import { useRootStore } from '@/utils/customHooks'

const LoginModal = ({ type, visible, setIsShowModal }) => {
  const { setUserInfo } = useRootStore().userStore

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const closeModal = () => {
    setUsername('')
    setPassword('')
    setIsShowModal(false)
  }

  const createUser = async () => {
    try {
      if (type === 1) {
        const res = await loginApi({
          name: username,
          password,
        })
        setUserInfo(res.data.token)
        console.log(res)
      } else {
        await creatUserApi({
          name: username,
          password,
          email: 'xxx@xxx.com',
        })
      }

      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal title={type === 1 ? '登录' : '注册'} visible={visible} onOk={createUser} onCancel={closeModal}>
      <div>
        用户名：
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        密码：
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
    </Modal>
  )
}

export default LoginModal
