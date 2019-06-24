import {combineReducers, createStore, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk'

import history from '../routers/history'

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