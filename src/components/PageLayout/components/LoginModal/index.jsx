import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Form, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { login, register } from '@/api/user'
import { setItem } from '@/utils/storage'
import style from './index.scss'
import md5 from 'js-md5'

import { checkEmail } from '@gworld/toolset'
import { useRootStore } from '@/utils/customHooks'
import { observer } from 'mobx-react-lite'

const LoginModal = () => {
  const { modelVisible, setModelVisible, modelType, setLoginState } = useRootStore().userStore
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState(modelType)
  const [checked, setChecked] = useState(true)
  // 防止点击协议与政策勾选
  const [isAllowed, setAllowed] = useState(true)
  const [loginForm] = Form.useForm()

  const closeModal = () => {
    loginForm.resetFields()
    setModelVisible(false)
  }

  const loginUser = async () => {
    try {
      const res = await login({
        username: username,
        password: md5(password),
      })
      setItem('token', res.data.token)
      message.success('登录成功')
      setLoginState(true)
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
      message.success('注册成功')
      loginUser()
    }
  }

  const onFinish = async () => {
    if (!checked) return message.error('请勾选协议与声明')
    switch (type) {
      case 1:
        loginUser()
        break
      case 2:
        registerUser()
        break
    }
  }

  const loginOrRegister = async (val) => {
    setType(val)
  }

  const checkChange = (e) => {
    if (!isAllowed) {
      setAllowed(true)
      return
    }
    setChecked(e.target.checked)
  }

  const toAgreement = (e, val) => {
    setAllowed(false)
    window.open(window.location.origin + `/${val}`)
  }

  const nameConfig = {
    rules: [
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (value === '' || value === undefined || value === null) {
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
          if (value === '' || value === undefined || value === null) {
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
          if (type === 1) {
            return Promise.resolve()
          }
          if (value === '' || value === undefined || value === null) {
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
  if (type === 1) {
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
    setType(modelType)
  }, [modelVisible])

  return (
    <Modal
      getContainer={false}
      title=""
      okText="确认"
      visible={modelVisible}
      onOk={loginUser}
      onCancel={closeModal}
      width={420}
      centered={true}
      footer={false}
      maskClosable={false}
      className={style.loginDialog}
    >
      <div className={style.loginLogo}>
        <img width={82} height={82} src="img/logo.png" alt="" />
        <span className={style.loginTitle}>超G知识库</span>
      </div>

      <Form name="normal_login" form={loginForm} className="login-form" onFinish={onFinish} autoComplete="off">
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
        {type === 2 ? (
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
          {type === 1 ? '登录' : '注册'}
        </Button>
        <div className={style.otherBox}>
          {defaultView}
          <Checkbox checked={checked} onChange={(e) => checkChange(e)} className={style.agreementBox}>
            阅读并接受
            <span className={style.agreement} onClick={(e) => toAgreement(e, 'agreement')}>
              《超G知识库协议》
            </span>
            及
            <span className={style.agreement} onClick={(e) => toAgreement(e, 'privacy')}>
              《超G知识库隐私权保护声明》
            </span>
          </Checkbox>
        </div>
      </Form>
    </Modal>
  )
}

export default observer(LoginModal)
