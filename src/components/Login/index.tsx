import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Dispatch } from 'redux'
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
        getUserInfoList(res)
        dispatch(push('/404'))
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));