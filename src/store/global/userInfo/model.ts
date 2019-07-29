import { Record } from 'immutable'

export class UserState extends Record({
  userName: undefined as string | undefined,
  userId: undefined as string | undefined
}) {}

export const initialState = new UserState({ userName: undefined , userId: undefined})