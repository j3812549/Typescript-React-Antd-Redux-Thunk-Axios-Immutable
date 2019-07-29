import * as React from 'react';
import './index.less'

class Err extends React.Component<any> {
  constructor(props: any) {
    super(props)
  }
  public render() {
    return (
      <div className="login-box">
        错误页面
      </div>
    )
  }
}

export default Err