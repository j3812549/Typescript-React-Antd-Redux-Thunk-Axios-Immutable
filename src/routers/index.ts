import { ComponentProps } from 'react'
import componentList from 'src/components'

const {
  Index,
  Login,

} = componentList

export interface IRouterMatch {
  path: string,
  title: string,
  icon?: string,
  component?: ComponentProps<any>,
  children?: IRouterMatch[]
}

/**
 * icon图标源自antd UI 组件，需要更换请移步
 * https://ant.design/components/icon-cn/
 * https://github.com/ant-design/ant-design/
 */

const componentMap: IRouterMatch[] = [
  {
    path: '/home',
    title: '首页',
    component: Index,
    icon: 'pie-chart'
  },
  {
    path: '/login',
    title: '登录',
    component: Login,
  }
]
const actionComponentMap: IRouterMatch[] = [
  
]

export {
  componentMap,
  actionComponentMap
}