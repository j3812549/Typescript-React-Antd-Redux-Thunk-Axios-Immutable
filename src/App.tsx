import * as React from 'react';
import * as PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { componentMap } from './routers'
import Err from './components/Err/index'

const Root = ({ store }:any) => (
  <Provider store={store}>
    <Router>
      <Switch>
        {
          componentMap.map((x: any, index: number) => {
            return <Route key={index} path={x.path} component={x.component} />
          })
        }
        <Route path='/404' component={Err} />
        <Redirect to='/404' />
      </Switch>
    </Router>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired
}
export default Root