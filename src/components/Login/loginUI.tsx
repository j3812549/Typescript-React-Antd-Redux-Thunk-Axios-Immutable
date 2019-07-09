import * as React from 'react'
import { ILoginProps } from './index'
import { Row, Col, Input } from 'antd'
import './index.less'

class Login extends React.Component <ILoginProps> {
  constructor(props: any) {
    super(props)
  }
  
  public render () {
    const { handleLogin } = this.props
    return (
      <div className="login-box">
        <Row>
            <Col span={6}>admin</Col>
            <Col span={18}>
              <Input/>
            </Col>
        </Row>
        <button onClick={handleLogin}>登录</button>
      </div>
    )
  }
}

export default Login