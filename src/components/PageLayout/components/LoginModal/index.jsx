import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Form, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login, userInfo, register } from '@/api/user'
import { useRootStore } from '@/utils/customHooks'
import { setToken } from '@/utils/storage'
import style from './index.scss'
import jwtDecode from 'jwt-decode'
import md5 from 'js-md5'

const LoginModal = ({ visible, setIsShowModal, change, onCancel, type }) => {
  const { setUserInfo } = useRootStore().userStore

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [titleType, setType] = useState(type)

  const closeModal = () => {
    setUsername('')
    setPassword('')
    setIsShowModal(false)
  }

  const loginUser = async () => {
    try {
      const res = await login({
        name: username,
        password: md5(password),
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

  // 注册
  const registerUser = async () => {
    const res = await register({
      name: username,
      password: md5(password),
      email: 'xxx@xxx.com',
    })

    if (res.code === 0) {
      loginUser()
    }
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    switch (titleType) {
      case 1:
        loginUser()
        break
      case 2:
        registerUser()
        break
    }
  }

  const loginOrRegister = async (val) => {
    console.log(val)
    setType(val)
  }

  let defaultView
  if (titleType === 1) {
    defaultView = (
      <div>
        <span>没有账号？</span>
        <span className={style.registerBtn} onClick={() => loginOrRegister(2)}>
          注册
        </span>
      </div>
    )
  } else {
    defaultView = (
      <div className={style.toLogin} onClick={() => loginOrRegister(1)}>
        已有账号登录
      </div>
    )
  }

  useEffect(() => {
    console.log(type)
    setType(type)
  }, [visible])

  return (
    <Modal
      title={titleType === 1 ? '登录' : '注册'}
      okText="确认"
      visible={visible}
      onOk={loginUser}
      onCancel={onCancel}
      width={320}
      centered={true}
      footer={false}
      maskClosable={false}
      className={style.loginDialog}
    >
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className={style.loginBtn}>
          {titleType === 1 ? '登录' : '注册'}
        </Button>
        <div className={style.otherBox}>
          {defaultView}
          <div className={style.agreementBox}>
            注册登录即表示同意
            <span className={style.agreement}>用户协议</span>、<span className={style.agreement}>隐私政策</span>
          </div>
        </div>
        {titleType === 1 ? (
          <div
            className={style.authLogin}
            onClick={() => {
              message.info('敬请期待')
            }}
          >
            第三方登录
          </div>
        ) : null}
      </Form>
      {/* <div>
        用户名：
        <Input value={username} placeholder="请输入用户名"  onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        密码
        <Input.Password value={password} placeholder="请输入密码" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="primary" className={style.loginBtn} onClick={hanldClick}>
        {titleType === 1 ? '登录' : '注册'}
      </Button>
      <div className={style.otherBox}>
        {defaultView}
        <div className={style.agreementBox}>
          注册登录即表示同意
          <span className={style.agreement}>用户协议</span>、<span className={style.agreement}>隐私政策</span>
        </div>
      </div> */}
    </Modal>
  )
}

export default LoginModal
