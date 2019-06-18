import {combineReducers, createStore } from 'redux'
import ReducerMapList from './ReducerMapList'

const store = createStore(
  combineReducers({
    ...ReducerMapList
  })
)

export default store