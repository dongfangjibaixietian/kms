import React from 'react'

import style from './index.scss'
import KnowledgeListHeader from './components/KnowledgeListHeader'
import ArticleList from '@/components/ArticleList'
import StickList from './components/StickList'
import TagList from './components/TagList'

const Home = () => {
  return (
    <div className={style.Knowledge}>
      <div className={style.KnowledgeLeft}>
        <div className={style.Main}>
          <StickList />
          <div className={style.ArticleMain}>
            <KnowledgeListHeader />
            <ArticleList />
          </div>
        </div>
      </div>
      <TagList />
    </div>
  )
}

export default Home
