import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'

import Test from '@/views/Test'
import RootProvider from '@/components/RootProvider'
import './styles/reset.scss'

configure({ enforceActions: 'observed' })

const render = () => {
  ReactDOM.render(
    <RootProvider>
      <Test />
    </RootProvider>,
    document.querySelector('#app')
  )
}

render()
