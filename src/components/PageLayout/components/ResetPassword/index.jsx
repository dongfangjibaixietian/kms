import React, { useState } from 'react'
import { Modal, Input, Button, Form, message } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { resetPassword } from '@/api/user'
import { removeItem } from '@/utils/storage'
import style from './index.scss'
import md5 from 'js-md5'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '@/utils/customHooks'

const LoginModal = ({ visible, change }) => {
  const [newPassword, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const { setLoginState } = useRootStore().userStore
  const [password, setPassword] = useState('')
  const [pwdForm] = Form.useForm()

  const closeModal = () => {
    pwdForm.resetFields()
    change(false)
  }

  const restPwd = async () => {
    try {
      // const res = await resetPassword({
      //   password: md5(password),
      //   newPassword: md5(newPassword),
      // })
      // message.success('密码已修改，请重新登录')
      // removeItem('token')
      // removeItem('user')
      // removeItem('article')
      // setLoginState(false)
      // closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  const pwdConfig = {
    rules: [
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (value === '' || value === undefined || value === null) {
            return Promise.reject('请输入原密码')
          }

          if (getFieldValue('password') === value && value.length >= 6) {
            return Promise.resolve()
          }
          return Promise.reject('密码长度不能小于6')
        },
      }),
    ],
  }

  const newPwdConfig = {
    rules: [
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (value === '' || value === undefined || value === null) {
            return Promise.reject('请输入新密码')
          }
          console.log(getFieldValue('confirmPwd'))
          console.log(getFieldValue('newPassword'))
          if (getFieldValue('confirmPwd') !== getFieldValue('newPassword') && value.length >= 6) {
            return Promise.reject('两次输入密码不一致!')
          }
          if (getFieldValue('newPassword') === value && value.length >= 6) {
            return Promise.resolve()
          }
          return Promise.reject('密码长度不能小于6')
        },
      }),
    ],
  }

  const confirmPwdConfig = {
    rules: [
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (value === '' || value === undefined || value === null) {
            return Promise.reject('请再次确认密码')
          }

          if (getFieldValue('confirmPwd') !== getFieldValue('newPassword')) {
            return Promise.reject('两次输入密码不一致!')
          }

          if (getFieldValue('confirmPwd') === value && value.length >= 6) {
            return Promise.resolve()
          }
          return Promise.reject('密码长度不能小于6')
        },
      }),
    ],
  }

  return (
    <Modal
      getContainer={false}
      title=""
      okText="确认"
      visible={visible}
      onCancel={closeModal}
      width={420}
      centered={true}
      footer={false}
      maskClosable={false}
      className={style.loginDialog}
    >
      <div className={style.loginLogo}>
        <img width={82} height={82} src={require('@/assets/img/logo.png').default} alt="" />
        <span className={style.loginTitle}>超G知识库</span>
      </div>

      <Form name="normal_login" form={pwdForm} className="login-form" onFinish={restPwd} autoComplete="off">
        <Form.Item name="password" {...pwdConfig}>
          <Input
            value={password}
            allowClear
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入原密码"
          />
        </Form.Item>
        <Form.Item name="newPassword" {...newPwdConfig}>
          <Input
            value={newPassword}
            allowClear
            onChange={(e) => setNewPwd(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入新密码"
          />
        </Form.Item>
        <Form.Item name="confirmPwd" {...confirmPwdConfig}>
          <Input
            value={confirmPwd}
            allowClear
            onChange={(e) => setConfirmPwd(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请再次输入新密码"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className={style.loginBtn}>
          确认
        </Button>
      </Form>
    </Modal>
  )
}

export default observer(LoginModal)
