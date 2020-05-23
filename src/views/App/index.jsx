import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useRootStore } from '@/utils/customHooks'

const App = () => {
  const { currentRoutes } = useRootStore().routerStore

  return (
    <Switch>
      {currentRoutes.map((item) => (
        <Route
          exact
          key={item.path}
          path={item.path}
          render={(props) => {
            const Component = item.component
            return <Component {...props} />
          }}
        />
      ))}
    </Switch>
  )
}

export default observer(App)
