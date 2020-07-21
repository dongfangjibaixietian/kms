import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { Modal, Input, Button, List, Checkbox, Tabs, Avatar, Spin, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { searchMember as searchMemberApi, addLibUser as addLibUserApi } from '@/api/library'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import style from './index.scss'

const { TabPane } = Tabs
const LoginModal = ({ visible, change, libId }) => {
  const [searchKey, setSearchVal] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [checked, setChecked] = useState(true)
  const [activeKey, setActiveKey] = useState('invite')
  const [list, setList] = useState([])

  const closeModal = () => {
    setActiveKey('invite')
    change()
  }

  const initialState = {
    pageIndex: 1,
    pageSize: 10,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        console.log({ ...state, ...action.payload })
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleInfiniteOnLoad = useCallback(() => {
    if (searchKey === '' || searchKey === null || searchKey === undefined) return
    setLoading(true)
    const pageIndex = state.pageIndex + 1
    dispatch({
      type: 'update',
      payload: {
        pageIndex,
      },
    })
  }, [hasMore, state.pageIndex, loading])

  const refresh = () => {
    //需要处理的数据
    console.log('更新')
    setHasMore(true)
    setLoading(false)
    setList([])
    dispatch({
      type: 'update',
      payload: {
        pageIndex: 1,
      },
    })
  }

  const getMemberList = async () => {
    if (!hasMore) return
    const res = await searchMemberApi({
      searchKey: searchKey,
      ...state,
    })
    console.log(res)

    if (!hasMore || res.data.list.length < 10) {
      setHasMore(false)
    }
    setList(res.data.list)
  }

  const debounceSearch = _.debounce((val) => {
    setSearchVal(val)
    refresh()
  }, 200)

  const changeTabs = (key) => {
    setActiveKey(key)
  }

  const addLibUser = async (item) => {
    const res = await addLibUserApi({
      id: item.id,
      libId: libId,
    })
    if (res.code === 0) {
      message.success('邀请成功')
      let copyList = []
      copyList = list.map((temp) => (temp.id === item.id ? { ...temp, isAdd: true } : { ...temp, isAdd: false }))
      setList(copyList)
    }
  }

  useEffect(() => {
    if (searchKey === '' || searchKey === null || searchKey === undefined) return
    getMemberList().then(() => {
      setLoading(false)
    })
  }, [hasMore, state.pageIndex, searchKey])

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
      className={style.memberDialog}
    >
      <Tabs defaultActiveKey="invite" animated={false} activeKey={activeKey} onChange={changeTabs}>
        <TabPane tab="邀请添加" key="invite">
          <Input
            addonAfter={
              <Button type="primary" className={style.copyBtn} size="small">
                复制链接
              </Button>
            }
          />
          <Checkbox onChange={(e) => setChecked(e.target.checked)} className={style.checkBox} checked={checked}>
            通过链接加入时需审批确认
          </Checkbox>
        </TabPane>
        <TabPane tab="搜索添加" key="search">
          <Input
            className={style.searchInput}
            placeholder="输入昵称、邮箱名进行搜索"
            onChange={(e) => debounceSearch(e.target.value)}
            allowClear
            prefix={<SearchOutlined style={{ color: 'rgba(201, 201, 201)', fontSize: 20 }} />}
          />
          <div className={style.title}>搜索结果</div>
          <div className={style.memberContainer}>
            <InfiniteScroll
              initialLoad={false}
              pageStart={100}
              loadMore={handleInfiniteOnLoad}
              hasMore={!loading && hasMore}
              useWindow={false}
            >
              <List
                dataSource={list}
                locale={{ emptyText: '暂无数据' }}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <div className={style.memberItem}>
                      <div className={style.memberDetail}>
                        <Avatar size="small" className={style.avatarImg} src={item.avatar} />
                        <div className={style.memberInfo}>
                          <div className={style.nickName}>{item.nickname}</div>
                          <div className={style.email}>{item.email}</div>
                        </div>
                      </div>
                      {item.isAdd ? (
                        '已邀请'
                      ) : (
                        <Button className={style.btn} size="small" onClick={() => addLibUser(item)}>
                          添加
                        </Button>
                      )}
                    </div>
                  </List.Item>
                )}
              >
                {loading && hasMore && (
                  <div className={style.loadingContainer}>
                    <Spin />
                  </div>
                )}
              </List>
            </InfiniteScroll>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default observer(LoginModal)
