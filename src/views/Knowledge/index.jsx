import React from 'react'

import style from './index.scss'
import KnowledgeListHeader from './components/KnowledgeListHeader'
import TagList from './components/TagList'

const Home = () => {
  return (
    <div className={style.Knowledge}>
      <KnowledgeListHeader />
      <TagList />
    </div>
  )
}

export default Home
