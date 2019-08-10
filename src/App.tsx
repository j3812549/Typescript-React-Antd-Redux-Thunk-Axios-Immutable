import * as React from 'react';
import * as PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { componentMap } from './routers'
import Err from './components/Err/index'
import history from './routers/history'
import { getCookie } from 'src/utils/token'
import userInfo from 'src/store/global/userInfo'

const { setUserInfoList } = userInfo.actions


const examineToken = (store: any) => {
  const userId = store.getState().getIn(['userInfo', 'userId'])
  if (userId) {
    return <Redirect to='/home' />
  } else {
    if (getCookie('user')) {
      store.dispatch(setUserInfoList(JSON.parse(getCookie('user') as string)))
      return <Redirect to='/home' />
    }
    return <Redirect to='/login' />
  }
}

const Root = ({ store }:any) => (
  <Provider store={store}>
      <Router history={history}>
        <Switch>
          {
            componentMap.map((x: any, index: number) => {
              return <Route key={index} path={x.path} component={x.component} />
            })
          }
          <Route path='/404' component={Err} />
          {
            examineToken(store)
          }
        </Switch>
      </Router>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired
}
export default Root