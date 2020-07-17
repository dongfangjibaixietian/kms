import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { setItem, getItem } from '@/utils/storage'
import style from './index.scss'
import EditorialPerson from './../EditorialPerson'
import { userInfo as userInfoApi, userOtherInfo } from '@/api/user'
import { useRootStore } from '@/utils/customHooks'

const Top = () => {
  const [publishModalVisible, setPublishModalVisible] = useState(false)
  const { setUserInfo, setModelVisible, isLogin, userInfo } = useRootStore().userStore
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
  const [nickname, setNickName] = useState([])
  const [description, setDescription] = useState([])

  const getUserInfo = async () => {
    // if (!isLogin) {
    //   setModelVisible(true)
    // }
    const res = await userInfoApi()
    const username = res.data.user.username
    const nickname = res.data.user.nickname
    const description = res.data.user.description
    setUserName(username)
    setNickName(nickname)
    setDescription(description)
    setUrl(res.data.user.avatar)
    setItem('user', JSON.stringify(res.data))
    setUserInfo(res.data)
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
  }, [isLogin])

  useEffect(() => {
    getUserInfo()
  }, [isLogin])

  return (
    <div className={style.KnowledgeListHeader}>
      <div className={style.header}>
        <div className={style.tabsWrapper}>
          {/* 左边的信息 */}
          <div className={style.pers}>
            <img className={style.pic} src={url} alt="" />
            <div className={style.leftinfo}>
              <div className={style.nm}>{nickname}</div>
              <div className={style.intro}>{description}</div>
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
          change={getUserInfo}
          triggerShowPublishModal={triggerShowPublishModal}
          visible={publishModalVisible}
        />
      )}
    </div>
  )
}

export default Top
