import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import LineChart from './LineChartUI'

export interface IStateProps {

}

interface IDispatchProps {

}

export type ILineChartProps = IStateProps & IDispatchProps & RouteComponentProps


const mapStateToProps = (state: ILineChartProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LineChart));