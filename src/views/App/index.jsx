import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import useGetRoutes from '@/router'

const App = () => {
  const { currentRoutes } = useGetRoutes()

  const renderRoutes = (routeMenu, path) => {
    const children = []
    const renderRoute = (item, routePath) => {
      const newPath = (item.path ? `${routePath}/${item.path}` : routePath).replace(/\/+/g, '/')

      if (item.component && item.children) {
        const childRoutes = renderRoutes(item.children, newPath)
        const Component = item.component
        children.push(
          <Route key={newPath} path={newPath} render={(props) => <Component {...props}>{childRoutes}</Component>} />
        )
      } else if (item.component) {
        children.push(<Route key={newPath} component={item.component} path={newPath} exact />)
      } else if (item.children) {
        item.children.forEach((route) => renderRoute(route, newPath))
      }
    }

    routeMenu.forEach((item) => renderRoute(item, path))
    return <Switch>{children}</Switch>
  }

  const routesNode = renderRoutes(currentRoutes, '/')

  return <BrowserRouter>{routesNode}</BrowserRouter>
}

export default observer(App)
