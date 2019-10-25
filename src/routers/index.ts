import { ComponentProps } from 'react'
import componentList from 'src/components'

const {
  Index,
  Login,
  Editor,
  SpeedBall
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
  {
    path: '/home/component',
    title: '组件',
    children: [
      {
        path: '/home/editor',
        title: '富文本',
        component: Editor
      }
    ]
  },
  {
    path: '/home/canvas',
    title: 'canvas',
    children: [
      {
        path: '/home/speedball',
        title: '加速球',
        component: SpeedBall
      }
    ]
  }
]

export {
  componentMap,
  actionComponentMap
}