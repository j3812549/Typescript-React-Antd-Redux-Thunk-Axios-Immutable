import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router'
import { ComponentProps } from 'react'
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { IndexProps } from './index'
import { IRouterMatch } from '../../routers'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu


class Index extends React.Component<IndexProps> {
  public state: {
    HeadSculpture: string
  }
  constructor(props: any) {
    super(props)
    this.state = {
      HeadSculpture: require('../../static/image/HeadSculpture.jpg')
    }
    this.createMenu = this.createMenu.bind(this)
    this.createRoute = this.createRoute.bind(this)
  }

  public createRoute(element: IRouterMatch[] | any): IRouterMatch[] | ComponentProps<any> {
    const children: IRouterMatch[] = element.children
    let temp
    if (children && children.length > 0) {
      temp = children.map(item => {
        return this.createRoute(item)
      })
      return temp
    } else {
      return (
        <Route key={element.path} path={element.path} component={element.component} />
      )
    }
  }

  public createMenu(element: IRouterMatch | any) {
    const children: IRouterMatch[] = element.children
    let temp
    if (children && children.length > 0) {
      temp = children.map((item, i) => {
        return this.createMenu(item)
      });
      return (
        <SubMenu key={element.path} title={
          <span>
            <Icon type={element.icon} />
            <span>{element.title}</span>
          </span>
        }>
          {temp}
        </SubMenu>
      )
    } else {
      return <Menu.Item data-path='/adsads' key={element.path}>
        <Icon type={element.icon} />
        {element.title}
      </Menu.Item>
    }
  }

  public render() {
    const HeadSculptureStyle = {
      width: 40,
      height: 40,
      borderRadius: '50%',
      position: 'absolute' as 'absolute',
      right: 20,
      top: 10
    }
    const { MenuItem, handleLayoutMenuItem, handleLogout } = this.props
    const MenuHtml = MenuItem.map((item: IRouterMatch, index: number) => {
      if (item.children && item.children.length > 0) {
        return this.createMenu(item)
      }
      return (
        <Menu.Item key={item.path}>
          <Icon type={item.icon} />
          {item.title}
        </Menu.Item>
      )
    })
    const RouteHtml = MenuItem.map((item: IRouterMatch, index: number) => {
      if (item.children && item.children.length > 0) {
        return this.createRoute(item)
      }
      return (
        <Route key={item.path} path={item.path} component={item.component} />
      )
    })
    const UserMenuHtml = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/j3812549">
            github
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tiancai9.top">
            ⑨のBlog
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={handleLogout} target="_blank" rel="noopener noreferrer">
            Logout
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            onClick={handleLayoutMenuItem}
          >
            {MenuHtml}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Dropdown overlay={UserMenuHtml}>
              <img style={HeadSculptureStyle} alt='头像' src={this.state.HeadSculpture} />
            </Dropdown>
          </Header>
          <Content style={{ margin: '24px 16px 0', height: '100%' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, height: '100%' }}>
              我的天？
              <Switch>
                {RouteHtml}
                <Redirect to='/home/test1' />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Index