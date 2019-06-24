import { ComponentProps } from 'react'
import componentList from '../components'

const {
  Index,
  Test1,
  Test2,
  Test3,
  Test4,
  Test5,
  Test6,
  Test7,
  Test8
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
    path: '/',
    title: '首页',
    component: Index,
    icon: 'pie-chart'
  }
]
const actionComponentMap: IRouterMatch[] = [
  {
    path: '/test1',
    title: '测试1',
    icon: 'setting',
    component: Test1
  },
  {
    path: '/test2',
    icon: 'setting',
    title: '测试2',
    component: Test2
  },
  {
    path: '/test3',
    title: '二级菜单测试',
    children: [
      {
        path: '/test3',
        title: '测试3',
        component: Test3
      },
      {
        path: '/test4',
        icon: 'setting',
        title: '测试4',
        component: Test4
      },
    ]
  },
  {
    path: '/test5',
    title: '多级菜单测试',
    children: [
      {
        path: '/test2333',
        title: '测试5',
        children: [
          {
            path: '/test5',
            icon: 'setting',
            title: '测试5',
            component: Test5
          },
          {
            path: '/test6',
            title: '测试6',
            component: Test6
          },
          {
            path: '/test7',
            icon: 'setting',
            title: '测试7',
            component: Test7
          },
        ]
      },
      {
        path: '/test8',
        icon: 'setting',
        title: '测试8',
        component: Test8
      },
    ]
  }
]

export {
  componentMap,
  actionComponentMap
}