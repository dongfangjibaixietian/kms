import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Uploader } from '@gworld/toolset'
import { getItem, setItem } from '@/utils/storage'
import useGetRoutes from '@/router'
import { useRootStore } from '@/utils/customHooks'
import { userInfo } from '@/api/user'
import jwtDecode from 'jwt-decode'

const App = ({ history }) => {
  const { currentRoutes } = useGetRoutes()
  const { setLoginState, isLogin, setUserInfo } = useRootStore().userStore

  Uploader.init()

  const getUserInfo = async () => {
    try {
      const user = jwtDecode(getItem('token'))
      const info = await userInfo({
        id: user.id,
      })
      setItem('user', JSON.stringify(info.data))
      setUserInfo(info.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!isLogin) return
    getUserInfo()
  }, [isLogin])

  useEffect(() => {
    const token = getItem('token')
    setLoginState(!!token)
  }, [])

  const renderRoutes = (routeMenu, path) => {
    const children = []
    const renderRoute = (item, routePath) => {
      const newPath = (item.path ? `${routePath}/${item.path}` : routePath).replace(/\/+/g, '/')
      if (item.component && item.children) {
        const childRoutes = renderRoutes(item.children, newPath)
        const Component = item.component
        children.push(
          <Route
            key={`${newPath}_${Math.random()}`}
            path={newPath}
            render={(props) => <Component {...props}>{childRoutes}</Component>}
          />
        )
      } else if (item.component) {
        children.push(<Route key={`${newPath}_${Math.random()}`} component={item.component} path={newPath} exact />)
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
