import { Action } from 'redux'
import { initialState } from './model'

export default (state = initialState, action: Action) => {
  switch (action.type) {
    default: 
    return state
  }
}