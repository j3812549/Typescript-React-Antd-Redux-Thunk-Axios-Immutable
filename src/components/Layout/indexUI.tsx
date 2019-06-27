import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router'
import { ComponentProps } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { IndexProps } from './index'
import { IRouterMatch } from '../../routers'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu


class Index extends React.Component<IndexProps> {
  constructor(props: any) {
    super(props)
    this.state = {}
    this.handleLayoutMenuItem = this.handleLayoutMenuItem.bind(this)
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
      return(
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

  public handleLayoutMenuItem(e: any) {
    const path = e.key
    this.props.history.push(path)
  }

  public render() {
    const { MenuItem } = this.props
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
    return (
      <Layout style={{height: '100%'}}>
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
            onClick={this.handleLayoutMenuItem}
          >
            {MenuHtml}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0',height: '100%' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, height: '100%' }}>
              我的天？
              <Switch>
                {RouteHtml}
                <Redirect to='/test1' />
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