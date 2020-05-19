import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'

import Test from '@/containers/views/Test'
import RootProvider from '@/containers/shared/RootProvider'

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
