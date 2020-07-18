import React from 'react'
// import { createBrowserHistory } from 'history';
import style from './index.scss'
import Nav from './../Nav'

const HeaderLeft = () => {
  // const history = createBrowserHistory();
  // console.log(history)
  return (
    <div className={style.headerLeft}>
      <div className={style.sloganImg}>
        <img
          width={120}
          src={require('@/assets/img/superG.png').default}
          onClick={() => (window.location.href = window.location.origin + `/`)}
          // onClick={() => (history.push('/home'))}
          alt=""
        />
      </div>
      <Nav />
    </div>
  )
}

export default HeaderLeft
