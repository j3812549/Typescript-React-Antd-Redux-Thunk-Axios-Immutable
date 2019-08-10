import * as Cookies from 'js-cookie'

export const setCookie = (name: string, value: object) => {
  Cookies.set(name, value)
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}

export const removeCookie = (name: string) => {
  Cookies.remove(name)
}
