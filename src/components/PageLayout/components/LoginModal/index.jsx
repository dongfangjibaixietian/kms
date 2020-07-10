import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Form, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
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
  const [email, setEmail] = useState('')
  const [titleType, setType] = useState(type)

  const closeModal = () => {
    setUsername('')
    setPassword('')
    setEmail('')
    setIsShowModal(false)
  }

  const loginUser = async () => {
    try {
      console.log('success')
      const res = await login({
        username: username,
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
      username: username,
      password: md5(password),
      email: email,
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
        <Form.Item
          name="username"
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                console.log(value)
                console.log(getFieldValue('username'))
                console.log(value.length)
                if (value === '') {
                  return Promise.reject('请输入用户名')
                }
                if (getFieldValue('username') === value && value.length >= 4) {
                  return Promise.resolve()
                }
                if (titleType === 2) {
                  return Promise.reject('用户名长度不能小于4')
                }
                return Promise.resolve()
              },
            }),
          ]}
        >
          <Input
            value={username}
            allowClear
            onChange={(e) => setUsername(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                console.log(value)
                console.log(getFieldValue('username'))
                console.log(value.length)
                if (value === '') {
                  return Promise.reject('请输入密码')
                }
                if (getFieldValue('password') === value && value.length >= 6) {
                  return Promise.resolve()
                }
                if (titleType === 2) {
                  return Promise.reject('密码长度不能小于6')
                }
                return Promise.resolve()
              },
            }),
          ]}
        >
          <Input
            value={password}
            allowClear
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        {titleType === 2 ? (
          <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱!' }]}>
            <Input
              value={email}
              allowClear
              onChange={(e) => setEmail(e.target.value)}
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="请输入邮箱"
            />
          </Form.Item>
        ) : null}

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
    </Modal>
  )
}

export default LoginModal
