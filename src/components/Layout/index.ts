import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Index from './indexUI'
import { RouteComponentProps } from 'react-router-dom'
import { IRouterMatch, actionComponentMap } from 'src/routers'
import { push } from 'react-router-redux'
import userInfo from 'src/store/global/userInfo'
import { message } from 'antd';

const { Logout } = userInfo.actions

interface IStateProps {
  MenuItem?: IRouterMatch[] | any
}

interface IDispatchProps {
  handleLayoutMenuItem(e: object): void,
  handleLogout(): void
}

export type IndexProps = IStateProps & IDispatchProps & RouteComponentProps


const mapStateToProps = (state: IndexProps) => {
  return {
    MenuItem: actionComponentMap
  }
}

const mapDispatchToProps = (dispatch: any | IndexProps) => {
  return {
    handleLayoutMenuItem (e: any) {
      const path = e.key
      dispatch(push(path))
    },
    handleLogout () {
      dispatch(Logout())
      message.success('登出成功')
      dispatch(push('/login'))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
