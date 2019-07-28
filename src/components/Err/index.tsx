import * as React from 'react';
import './index.less'

class Err extends React.Component<any> {
  constructor(props: any) {
    super(props)
    this.state = {
      aaa: '2'
    }
  }
  public render() {
    return (
      <div className="login-box">
        错误页面
        <input onChange={(e) => {
          this.setState({
            aaa: 3
          })
          console.log(this.state)
        }} />
      </div>
    )
  }
}

export default Err