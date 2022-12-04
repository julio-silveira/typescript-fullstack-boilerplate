import {
  FetchErrorOutput,
  FetchLoginOutput,
  FetchTasksOutput
} from '../@types/fetch'
import { ILogin } from '../@types/home'
import { iTaskData } from '../@types/tasks'
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

export const registerUser = async (
  userData: ILogin
): Promise<FetchLoginOutput | FetchErrorOutput | void> => {
  try {
    const response = await fetch('http://localhost:8000/users/create', {
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

export const saveTask = async (taskData: iTaskData): Promise<string | void> => {
  try {
    const userId = getUserId()
    const token = getToken()
    const response = await fetch(
      `http://localhost:8000/users/${userId}/tasks`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify(taskData)
      }
    )
    const { message } = await response.json()
    return message
  } catch (error) {
    console.error(error)
  }
}

export const editTask = async (taskData: iTaskData): Promise<void> => {
  try {
    const { id, userId, title, description } = taskData
    const token = getToken()
    await fetch(`http://localhost:8000/users/${userId}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ title, description })
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteTask = async (
  id: number | string,
  userId: number | string
): Promise<void> => {
  try {
    const token = getToken()
    await fetch(`http://localhost:8000/users/${userId}/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', authorization: token }
    })
  } catch (error) {
    console.error(error)
  }
}
