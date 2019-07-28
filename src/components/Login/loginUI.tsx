import * as React from 'react'
import { ILoginProps, IStateProps } from './index'
import { Row, Col, Input, Icon, Button } from 'antd'
import './index.less'

interface ILoginInput {
  fontIcon: string,
  value: string,
  placeholder?: string,
  type?: string
}

class Login extends React.Component<ILoginProps> {
  public state: IStateProps
  constructor(props: any) {
    super(props)
    this.state = {
      user: 'admin',
      password: '123456'
    }
  }

  public render() {
    console.log(process.env.NODE_ENV)
    const data = { user: this.state.user, password: this.state.password }
    const { handleLogin } = this.props
    const changeValue = (valueName: string) => (e: any) => this.setState({ [valueName]: e.target.value })
    const LoginInput: ILoginInput[] = [
      {
        fontIcon: 'user',
        placeholder: 'admin',
        value: 'user',
        type: 'text'
      },
      {
        fontIcon: 'lock',
        placeholder: 'password',
        value: 'password',
        type: 'password'
      }
    ]
    return (
      <div className="login-box">
        <div className="login-warp">
          <Row style={{ fontSize: 30, textAlign: 'center' }}>⑨</Row>
          {
            LoginInput.map((item, index) => {
              return (
                <Row key={index}>
                  <Col span={2}>
                    <Icon style={{ fontSize: 25 }} type={item.fontIcon} />
                  </Col>
                  <Col span={22}>
                    <Input
                      type={item.type}
                      value={this.state[item.value]}
                      placeholder={item.placeholder}
                      onChange={changeValue(item.value)}
                    />
                  </Col>
                </Row>
              )
            })
          }
          <Row>
            <Col>
              <Button onClick={() => handleLogin(data)}>登录</Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Login