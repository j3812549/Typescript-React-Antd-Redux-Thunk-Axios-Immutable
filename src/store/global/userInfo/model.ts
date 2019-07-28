import { Record } from 'immutable'

export class UserState extends Record({
  userName: '' as string,
  userId: '' as string
}) {}

export const initialState = new UserState({ userName: '' , userId: ''})