import { Record } from 'immutable'

export class UserState extends Record({
  id: 0 as number,
  data: '' as string
}) {}

const id = 1

export const initialState = new UserState({ id , data: ''})