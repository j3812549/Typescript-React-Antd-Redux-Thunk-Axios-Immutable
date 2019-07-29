import { Action as ReduxAction } from 'redux'
import { initialState } from './model'
import type from './type'

interface IAction extends ReduxAction {
  data: any
}

export default (state = initialState, action: IAction) => {
  let newState = state
  switch (action.type) {
    case type.GET_LOGIN_INFO:
      newState = newState.set('userName', action.data.userName)
      newState = newState.set('userId', action.data.userId)
    case type.LOGOUT:
      newState = newState.set('userName', undefined)
      newState = newState.set('userId', undefined)
  }
  return newState
}