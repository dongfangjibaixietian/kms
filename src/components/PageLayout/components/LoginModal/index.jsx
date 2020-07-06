import React, { useState } from 'react'
import { Modal, Input } from 'antd'

import { login, userInfo, register } from '@/api/user'
import { useRootStore } from '@/utils/customHooks'
import { setToken } from '@/utils/storage'
import jwtDecode from 'jwt-decode'
const LoginModal = ({ visible, setIsShowModal, change, onCancel }) => {
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

  // 注册的逻辑也一样
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
    // 把这个给我改了，登录框
    // 参考掘金的登录框 https://juejin.im/
    <Modal
      title="登录"
      okText="确认"
      visible={visible}
      onOk={loginUser}
      onCancel={onCancel}
      width={400}
      centered={true}
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
