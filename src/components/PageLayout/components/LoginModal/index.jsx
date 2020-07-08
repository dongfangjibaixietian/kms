import React, { useState } from 'react'
import { Modal, Input } from 'antd'

import { login, userInfo, register } from '@/api/user'
import { useRootStore } from '@/utils/customHooks'
import { setToken } from '@/utils/storage'
import jwtDecode from 'jwt-decode'
const LoginModal = ({ visible, setIsShowModal, change }) => {
  const { setUserInfo } = useRootStore().userStore

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const closeModal = () => {
    setUsername('')
    setPassword('')
    setIsShowModal(false)
  }

  const loginUser = async () => {
    try {
      const res = await login({
        name: username,
        password,
      })
      setToken(res.data.token)
      change(res.data.token)
      const user = jwtDecode(res.data.token)
      console.log(user)
      const info = await userInfo({
        id: user.id,
      })
      setUserInfo(info.data)
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  const registerUser = async () => {
    const res = await register({
      name: username,
      password,
      email: 'xxx@xxx.com',
    })
    if (res.code === 0) {
      loginUser()
    }
  }

  return (
    <Modal
      title="登录"
      cancelText="立即注册"
      okText="确认"
      visible={visible}
      onOk={loginUser}
      onCancel={registerUser}
      width={400}
    >
      <div>
        用户名：
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        密码：
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
    </Modal>
  )
}

export default LoginModal
