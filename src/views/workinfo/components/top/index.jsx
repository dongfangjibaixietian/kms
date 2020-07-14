import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

import style from './index.scss'
import EditorialPerson from './../EditorialPerson'
import { userInfo, userOtherInfo } from '@/api/user'

const Top = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)

  const triggerShowPublishModal = (isShow) => {
    setPublishModalVisible(isShow)
  }

  const [fansCount, setFansCount] = useState([])
  const [articleCount, setArticleCount] = useState([])
  const [followCount, setFollowCount] = useState([])
  const [likeCount, setLikeCount] = useState([])
  const [readCount, setReadCount] = useState([])
  const [url, setUrl] = useState('')
  const [username, setUserName] = useState([])

  const getUserInfo = async () => {
    const res = await userInfo()
    const username = res.data.user.username
    setUserName(username)
    // window.location.reload()
  }

  const getUserOtherInfo = async () => {
    const res = await userOtherInfo()
    const fansCount = res.data.fansCount
    const articleCount = res.data.articleCount
    const followCount = res.data.followCount
    const likeCount = res.data.likeCount
    const readCount = res.data.readCount
    setFansCount(fansCount)
    setArticleCount(articleCount)
    setFollowCount(followCount)
    setLikeCount(likeCount)
    setReadCount(readCount)
  }

  useEffect(() => {
    getUserOtherInfo()
  }, [])

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className={style.KnowledgeListHeader}>
      <div className={style.header}>
        <div className={style.tabsWrapper}>
          {/* 左边的信息 */}
          <div className={style.pers}>
            <img className={style.pic} src={url} alt="" />
            <div className={style.leftinfo}>
              <div className={style.nm}>{username}</div>
              <div className={style.intro}>暂无个人介绍</div>
              <Button onClick={() => triggerShowPublishModal(true)} className={style.publishBtn}>
                编辑资料
              </Button>
            </div>
          </div>
          {/* 右边的信息 */}
          <div className={style.rigtinfo}>
            <div className={style.one}>
              <div className={style.dataone}>{readCount}</div>
              <div>总阅读</div>
            </div>
            <div className={style.two}>
              <div className={style.datatwo}>{articleCount}</div>
              <div>文章</div>
            </div>
            <div className={style.three}>
              <div className={style.datathree}>{likeCount}</div>
              <div>点赞数</div>
            </div>
            <div className={style.four}>
              <div className={style.datafour}>{followCount}</div>
              <div>关注</div>
            </div>
            <div className={style.five}>
              <div className={style.datafive}>{fansCount}</div>
              <div>粉丝</div>
            </div>
          </div>
        </div>
      </div>
      {publishModalVisible && (
        <EditorialPerson
          change={setUrl}
          triggerShowPublishModal={triggerShowPublishModal}
          visible={publishModalVisible}
        />
      )}
    </div>
  )
}

export default Top
