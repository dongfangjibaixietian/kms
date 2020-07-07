import React, { useState, useRef } from 'react'

import style from './index.scss'
import KnowledgeListHeader from './components/KnowledgeListHeader'
import ArticleList from '@/components/ArticleList'
import StickList from './components/StickList'
import TagList from './components/TagList'

const Home = () => {
  const [isEssence, setEssence] = useState(false)
  const [isHot, setHot] = useState(false)
  const listRef = useRef()

  const updateChildState = (val) => {
    switch (val) {
      case 'sift':
        setEssence(true)
        setHot(false)
        break
      case 'hot':
        setEssence(false)
        setHot(true)
        break
      default:
        setEssence(false)
        setHot(false)
    }
    listRef.current.refresh()
  }

  return (
    <div className={style.Knowledge}>
      <div className={style.KnowledgeLeft}>
        <div className={style.Main}>
          <StickList />
          <div className={style.ArticleMain}>
            <KnowledgeListHeader update={updateChildState} />
            <ArticleList isEssence={isEssence} isHot={isHot} ref={listRef} />
          </div>
        </div>
      </div>
      <TagList />
    </div>
  )
}

export default Home
