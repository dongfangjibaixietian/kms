import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Form, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { login, register } from '@/api/user'
import { setItem } from '@/utils/storage'
import style from './index.scss'
import md5 from 'js-md5'
import { checkEmail } from '@gworld/toolset'

const LoginModal = ({ visible, setIsShowModal, change, onCancel, type }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [titleType, setType] = useState(type)
  const [checked, setChecked] = useState(true)
  const [loginForm] = Form.useForm()

  const closeModal = () => {
    setUsername('')
    setPassword('')
    setEmail('')
    setIsShowModal(false)
  }

  const loginUser = async () => {
    try {
      const res = await login({
        username: username,
        password: md5(password),
      })
      setItem('token', res.data.token)
      change(res.data.token)
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

  useEffect(() => {
    if (!visible) return
    if (titleType === 1) {
      loginForm.validateFields(['username', 'password'])
    } else {
      loginForm.validateFields(['username', 'password', 'email'])
    }
  }, [titleType, visible])

  const onFinish = async () => {
    if (!checked) return message.error('请勾选协议与声明')
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

  const nameConfig = {
    rules: [
      ({ getFieldValue }) => ({
        validator(rule, value) {
          console.log(value)
          if (value === '') {
            return Promise.reject('请输入用户名')
          }
          if (getFieldValue('username') === value && value.length >= 4) {
            return Promise.resolve()
          }
          return Promise.reject('用户名长度不能小于4')
        },
      }),
    ],
  }

  const passWordConfig = {
    rules: [
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (value === '') {
            return Promise.reject('请输入密码')
          }
          if (getFieldValue('password') === value && value.length >= 6) {
            return Promise.resolve()
          }
          return Promise.reject('密码长度不能小于6')
        },
      }),
    ],
  }

  const emailConfig = {
    rules: [
      ({}) => ({
        validator(rule, value) {
          if (titleType === 1) {
            return Promise.resolve()
          }
          if (value === '') {
            return Promise.reject('请输入邮箱')
          }
          if (checkEmail(value)) {
            return Promise.resolve()
          }
          return Promise.reject('请输入正确的邮箱')
        },
      }),
    ],
  }

  let defaultView
  if (titleType === 1) {
    defaultView = (
      <div className={style.registerBtn} onClick={() => loginOrRegister(2)}>
        立即注册
      </div>
    )
  } else {
    defaultView = (
      <div className={style.toLogin} onClick={() => loginOrRegister(1)}>
        已有账号？ 点击登录
      </div>
    )
  }

  useEffect(() => {
    console.log(type)
    setType(type)
  }, [visible])

  return (
    <Modal
      getContainer={false}
      title=""
      okText="确认"
      visible={visible}
      onOk={loginUser}
      onCancel={onCancel}
      width={420}
      centered={true}
      footer={false}
      maskClosable={false}
      className={style.loginDialog}
    >
      <div className={style.loginLogo}>
        <img width={82} height={82} src="/src/assets/img/logo.png" alt="" />
        <span className={style.loginTitle}>超G知识库</span>
      </div>

      <Form name="normal_login" form={loginForm} className="login-form" onFinish={onFinish}>
        <Form.Item name="username" {...nameConfig}>
          <Input
            value={username}
            allowClear
            onChange={(e) => setUsername(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item name="password" {...passWordConfig}>
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
          <Form.Item name="email" {...emailConfig}>
            <Input
              value={email}
              allowClear
              type="email"
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
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} className={style.agreementBox}>
            阅读并接受
            <span className={style.agreement}>《超G知识库协议》</span>及
            <span className={style.agreement}>《超G知识库隐私权保护声明》</span>
          </Checkbox>
        </div>
      </Form>
    </Modal>
  )
}

export default LoginModal
