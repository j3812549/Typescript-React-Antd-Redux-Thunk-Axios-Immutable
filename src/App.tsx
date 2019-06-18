import * as React from 'react';
import * as PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReducerMapList from './components'

const Root = ({ store }:any) => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={ReducerMapList[0]} />
    </Router>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired
}
export default Root