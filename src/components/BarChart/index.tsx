import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import BarChart from './BarChartUI'

export interface IStateProps {

}

interface IDispatchProps {

}

export type IBarChartProps = IStateProps & IDispatchProps & RouteComponentProps


const mapStateToProps = (state: IBarChartProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BarChart));