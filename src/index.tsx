import React from 'react'
import ReactDOM from 'react-dom'

import Test from '@views/Test'

const render = () => {
    ReactDOM.render(<Test />, document.querySelector('#app'))
}

render()
