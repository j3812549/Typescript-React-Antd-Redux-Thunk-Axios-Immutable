import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { push } from 'react-router-redux'
import Login from './loginUI'

interface IStateProps {
  userName: string
}

interface IDispatchProps {
  handleLogin(): void
}

export type ILoginProps = IStateProps & IDispatchProps & RouteComponentProps

const mapStateToProps = (state: ILoginProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch: any | ILoginProps) => {
  return {
    handleLogin: () => {
      dispatch(push('/404'))
      // dispatch(push('/home/test1'))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));