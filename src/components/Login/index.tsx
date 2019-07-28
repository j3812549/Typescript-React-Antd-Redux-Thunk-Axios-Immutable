import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Dispatch } from 'redux'
import Login from './loginUI'
import { LoginAPI } from '../../api/user'


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
        console.log(res)
        dispatch(push('/home'))
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));