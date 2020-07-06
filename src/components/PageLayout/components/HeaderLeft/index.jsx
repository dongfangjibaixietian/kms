import React from 'react'

import style from './index.scss'
import Nav from './../Nav'

const HeaderLeft = () => {
  return (
    <div className={style.headerLeft}>
      <div className={style.sloganImg}>
        <img width={120} src={require('@/assets/img/superg.png').default} alt="" />
      </div>
      <Nav />
    </div>
  )
}

export default HeaderLeft
