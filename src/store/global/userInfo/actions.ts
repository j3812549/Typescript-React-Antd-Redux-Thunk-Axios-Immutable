import { Dispatch } from 'redux'
import type from './type'

export interface IUserResponse {
  code: number,
  data: object | string
}

export const getUserInfoList = (res: IUserResponse) => {
  console.log(res)
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: type.GET_LOGIN_INFO, data: res.data })
  }
}