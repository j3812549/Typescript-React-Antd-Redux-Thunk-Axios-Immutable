import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Dispatch } from 'redux'
import { message } from 'antd'
import Login from './loginUI'
import { LoginAPI } from '../../api/user'
import userInfo from '../../store/global/userInfo'

const { getUserInfoList } = userInfo.actions

export interface IStateProps {
  user: string,
  password: string
}

interface IDispatchProps {
  handleLogin(data: object): void
}

export type ILoginProps = IStateProps & IDispatchProps & RouteComponentProps


const mapStateToProps = (state: ILoginProps) => {
  console.log(state)
  return {
    user: '',
    password: ''
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleLogin: (data: object) => {
      LoginAPI(data).then((res: any) => {
        if (res.code !== 200) {
          message.error('登入失败')
          return
        }
        message.success(`登录成功`)
        dispatch(getUserInfoList(res.data))
        dispatch(push('/home'))
      }).catch(err => {
        message.error(`发生未知错误${err}`)
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));