import { Action as ReduxAction } from 'redux'
import { initialState } from './model'
import type from './type'

interface IAction extends ReduxAction {
  data: any
}

export default (state = initialState, action: IAction) => {
  let newState = state
  console.log(action)
  switch (action.type) {
    case type.GET_LOGIN_INFO:
      newState = newState.set('userName', action.data.name)
      newState = newState.set('userId', action.data.user)
    default:
  }
  return newState
}