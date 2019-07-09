import * as React from 'react'
import { ILoginProps } from './index'


class Login extends React.Component <ILoginProps> {
  constructor(props: any) {
    super(props)
  }
  
  public render () {
    const { handleLogin } = this.props
    return (
      <div>
        <button onClick={handleLogin}>登录</button>
      </div>
    )
  }
}

export default Login