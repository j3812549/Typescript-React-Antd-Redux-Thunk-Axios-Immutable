import * as React from 'react';
import './index.less'
import store from '../../store'

class Err extends React.Component<any> {
  constructor(props: any) {
    super(props)
    console.log(store.getState())
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