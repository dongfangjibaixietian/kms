import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'

import RootProvider from '@/components/RootProvider'
import './styles/reset.scss'
import App from '@/views/App'

configure({ enforceActions: 'observed' })

const render = () => {
  ReactDOM.render(
    <RootProvider>
      <App />
    </RootProvider>,
    document.querySelector('#app')
  )
}

render()
