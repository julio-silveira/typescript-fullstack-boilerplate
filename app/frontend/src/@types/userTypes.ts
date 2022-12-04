export interface IUser {
  username: string
  password: string
}

export interface IFetchLoginSucess {
  token: string
  userId: string
}

export interface IFetchLoginMessage {
  message: string | undefined
}

export type UserLogin = IFetchLoginMessage | void
