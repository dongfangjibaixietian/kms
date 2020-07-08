import React from 'react'
import style from './index.scss'
import HeaderLeft from './components/HeaderLeft'
import HeaderRight from './components/HeaderRight'

const PageLayout = ({ children }) => {
  return (
    <div className={style.appContainer}>
      <div className={style.header}>
        <div className={style.pageHeader}>
          <HeaderLeft />
          <HeaderRight />
        </div>
      </div>
      <div className={style.appContent}>{children}</div>
    </div>
  )
}

export default PageLayout
