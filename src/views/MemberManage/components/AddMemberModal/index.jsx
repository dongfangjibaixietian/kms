import React, { useState } from 'react'
import { Modal, Input, Button, Form, message, Tabs, AutoComplete } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { resetPassword } from '@/api/user'
import { removeItem } from '@/utils/storage'
import style from './index.scss'
import md5 from 'js-md5'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '@/utils/customHooks'
const { TabPane } = Tabs

const LoginModal = ({ visible, change }) => {
  const [newPassword, setNewPwd] = useState('')
  const { setLoginState } = useRootStore().userStore
  const [password, setPassword] = useState('')
  const [pwdForm] = Form.useForm()

  const closeModal = () => {
    pwdForm.resetFields()
    change(false)
  }
  const mockVal = (str, repeat) => {
    return {
      value: str.repeat(repeat),
    }
  }
  const [value, setValue] = useState('')
  const [options, setOptions] = useState([])
  const onSearch = (searchText) => {
    setOptions(!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)])
  }

  const onSelect = (data) => {
    console.log('onSelect', data)
  }
  const onChange = (data) => {
    setValue(data)
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="邀请添加" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="搜索添加" key="2">
          <AutoComplete
            options={options}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="输入昵称、邮箱名进行搜索"
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default observer(LoginModal)
