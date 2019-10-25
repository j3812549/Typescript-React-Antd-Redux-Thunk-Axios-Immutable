import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import SpeedBall from './SpeedBallUI'

export interface IStateProps {

}

interface IDispatchProps {

}

export type ISpeedBallProps = IStateProps & IDispatchProps & RouteComponentProps


const mapStateToProps = (state: ISpeedBallProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpeedBall));