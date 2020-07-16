import React, { useState, useEffect } from 'react'
import style from './index.scss'
import ArticleList from '@/components/ArticleList'
import { format } from '@gworld/toolset'
import { articleDetail } from '@/api/article'

const PublicizePage = ({ history, location }) => {
  const [publishDate] = useState(format(new Date(), 'YYYY-MM-DD'))
  // 文章ID
  const [id, setArticleId] = useState('')
  const [title, setTitle] = useState('')

  const getArticleDetail = async () => {
    console.log(id)
    const res = await articleDetail({ id: id })
    console.log(res.data)
    setTitle(res.data.title)
  }

  useEffect(() => {
    console.log('发表成功')
    console.log(location)
    if (location.data && location.data.id) {
      const searchId = location.data.id
      sessionStorage.setItem('publishId', searchId)
      setArticleId(searchId)
    } else {
      setArticleId(sessionStorage.getItem('publishId'))
    }
  }, [])

  useEffect(() => {
    if (id) getArticleDetail()
  }, [id])

  return (
    <div className={style.publishWrap}>
      <div className={style.main}>
        <div className={style.articleInfo}>
          <div>
            <div className={style.tips}>发表成功！有了你的分享，超G知识库会变得更好！</div>
            <div className={style.publishDate}>{publishDate}</div>
            <div className={style.toDeatil}>
              <a
                className={style.toArticle}
                onClick={() => {
                  window.open(window.location.origin + `/article/detail?id=${id}`)
                }}
              >
                {title}
              </a>
              <div className={style.goHome} onClick={() => history.replace('/')}>
                回到首页
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ padding: '20px', color: '#333', fontSize: '22px' }}>推荐阅读</div>
          <ArticleList isEssence={false} isHot={false} />
        </div>
      </div>
    </div>
  )
}

export default PublicizePage
