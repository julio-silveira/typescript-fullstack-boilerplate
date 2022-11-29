import {
  FetchErrorOutput,
  FetchLoginOutput,
  FetchTasksOutput
} from '../@types/fetch'
import { ILogin } from '../@types/home'
import { getToken, getUserId } from './localStorage'

export const loginFetch = async (
  userData: ILogin
): Promise<FetchLoginOutput | FetchErrorOutput | void> => {
  try {
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getTasks = async (): Promise<
  FetchTasksOutput[] | FetchErrorOutput | void
> => {
  try {
    const userId = getUserId()
    const token = getToken()
    const response = await fetch(
      `http://localhost:8000/users/${userId}/tasks`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: token }
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
