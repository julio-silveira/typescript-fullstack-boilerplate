import { ILogin } from '../@types/home'

export const loginFetch = async (userData: ILogin): Promise<string> => {
  const response = await fetch('http://localhost:8000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })

  const { token } = await response.json()

  return token
}
