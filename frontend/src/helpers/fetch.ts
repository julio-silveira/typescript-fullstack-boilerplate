import { FetchLoginOutput } from '../@types/fetch'
import { ILogin } from '../@types/home'
import { getToken, getUserId } from './localStorage'

export const loginFetch = async (
  userData: ILogin
): Promise<FetchLoginOutput | void> => {
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

export const getTasks = async (): Promise<any> => {
  try {
    const userId = getUserId()
    console.log(userId)
    const token = getToken()
    const response = await fetch(
      `http://localhost:8000/users/${userId}/tasks`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: token }
      }
    )
    const data = await response.json()
    console.log(data)

    return data
  } catch (error) {
    console.error(error)
  }
}
