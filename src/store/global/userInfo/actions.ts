import type from './type'

export interface IUserResponse {
  code: number,
  data: object | string
}

export const getUserInfoList = (data: IUserResponse) => {
  return { type: type.GET_LOGIN_INFO, data }
}

export const Logout = () => {
  return { type: type.LOGOUT }
}