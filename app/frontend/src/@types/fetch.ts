export interface FetchLoginOutput {
  token?: string
  userId?: number
  message?: string
}

export interface FetchTasksOutput {
  id: string
  userId: string
  title: string
  description: string
}

export interface FetchErrorOutput {
  message: string
}
