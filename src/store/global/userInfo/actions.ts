import type from './type'

export interface IUserResponse {
  code: number,
  data: object | string
}

export const setUserInfoList = (data: IUserResponse) => {
  return { type: type.SET_LOGIN_INFO, data }
}

export const Logout = () => {
  return { type: type.LOGOUT }
}