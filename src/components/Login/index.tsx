import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Dispatch } from 'redux'
import { message } from 'antd'
import Login from './loginUI'
import { LoginAPI } from 'src/api/user'
import userInfo from 'src/store/global/userInfo'
import { setCookie } from 'src/utils/token'

const { setUserInfoList } = userInfo.actions

export interface IStateProps {
  user: string,
  password: string
}

interface IDispatchProps {
  handleLogin(data: object): void
}

export type ILoginProps = IStateProps & IDispatchProps & RouteComponentProps


const mapStateToProps = (state: ILoginProps) => {
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
        setCookie('user', res.data)
        dispatch(setUserInfoList(res.data))
        dispatch(push('/home'))
      }).catch(err => {
        message.error(`发生未知错误${err}`)
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));