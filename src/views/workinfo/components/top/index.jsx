import React, { useState, useEffect } from 'react'
import { getItem } from '@/utils/storage'
import style from './index.scss'
import EditorialPerson from './../EditorialPerson'
import { userOtherInfo } from '@/api/user'
import { useRootStore } from '@/utils/customHooks'

const Top = ({ userId, isSelf }) => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)
  const { setModelVisible, isLogin } = useRootStore().userStore
  const triggerShowPublishModal = (isShow) => {
    if (!getItem('token') || !isLogin) {
      setModelVisible(true)
      return
    }
    setPublishModalVisible(isShow)
  }
  const [otherUserInfo, setOtherUserInfo] = useState({})
  // const [userId, setUserId] = useState('')
  // const [currentUserInfo, setCurrentUserInfo] = useState({})

  const getUserOtherInfo = async () => {
    const res = await userOtherInfo({ userId: userId })
    if (res.code === 0) {
      setOtherUserInfo(res.data)
    }
  }

  const otherList = [
    {
      name: '总阅读',
      value: 'readCount',
    },
    {
      name: '文章',
      value: 'articleCount',
    },
    {
      name: '点赞数',
      value: 'likeCount',
    },
    {
      name: '关注',
      value: 'followCount',
    },
    {
      name: '粉丝',
      value: 'fansCount',
    },
  ]

  useEffect(() => {
    userId && getUserOtherInfo()
    // !isLogin && setCurrentUserInfo({})
  }, [isLogin, userId])

  return (
    <div className={style.KnowledgeListHeader}>
      <div className={style.tabsWrapper}>
        {/* 左边的信息 */}
        <div className={style.pers}>
          <img className={style.pic} src={otherUserInfo.avatar} alt="" />
          <div className={style.leftinfo}>
            <div className={style.nm}>{otherUserInfo.nickname}</div>
            <div className={style.intro}>{otherUserInfo.description ? otherUserInfo.description : '暂无简介'}</div>
            {isSelf ? (
              <div onClick={() => triggerShowPublishModal(true)} className={style.publishBtn}>
                编辑资料
              </div>
            ) : null}
          </div>
        </div>
        {/* 右边的信息 */}
        <div className={style.rigtinfo}>
          {otherList.map((item) => (
            <div className={style.item} key={item.value}>
              <div className={style.itemValue}>
                {otherUserInfo[item.value]}
                <span style={{ fontSize: '14px' }}>{item.value === 'articleCount' ? '篇' : ''}</span>
              </div>
              <div className={style.itemName}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      {publishModalVisible && (
        <EditorialPerson
          change={getUserOtherInfo}
          triggerShowPublishModal={triggerShowPublishModal}
          visible={publishModalVisible}
        />
      )}
    </div>
  )
}

export default Top
