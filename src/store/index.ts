import { createStore, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { combineReducers } from 'redux-immutable'
import thunk from 'redux-thunk'

import history from 'src/routers/history'

import ReducerMapList from './ReducerMapList'


const middleware = [
  thunk,
  routerMiddleware(history)
]


const store = createStore(
  combineReducers({
    ...ReducerMapList,
    routing: routerReducer
  }),
  applyMiddleware(...middleware)
)

export default store