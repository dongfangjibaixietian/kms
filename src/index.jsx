import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { configure } from 'mobx'

import RootProvider from '@/components/RootProvider'
import './styles/reset.scss'
import PageLayout from '@/components/PageLayout'
import App from '@/views/App'

configure({ enforceActions: 'observed' })

const render = () => {
  ReactDOM.render(
    <RootProvider>
      <BrowserRouter>
        <PageLayout>
          <App />
        </PageLayout>
      </BrowserRouter>
    </RootProvider>,
    document.querySelector('#app')
  )
}

render()
