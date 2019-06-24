import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Index from './indexUI'
import { actionComponentMap } from '../../routers'
import { RouteComponentProps } from 'react-router-dom'
import { IRouterMatch } from '../../routers'

interface IStateProps {
  MenuItem?: IRouterMatch[] | any
}

interface IDispatchProps {
  handleLayoutMenuItem(e: object): void
}

export type IndexProps = IStateProps & IDispatchProps & RouteComponentProps


const mapStateToProps = (state: IndexProps) => {
  return {
    MenuItem: actionComponentMap
  }
}

const mapDispatchToProps = (dispatch: any | IndexProps) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
