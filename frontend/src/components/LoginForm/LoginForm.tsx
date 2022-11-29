import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FetchLoginOutput } from '../../@types/fetch'
import { loginFetch } from '../../helpers/fetch'
import { saveToken, saveUserId } from '../../helpers/localStorage'

interface ILogin {
  username: string
  password: string
}

export default function LoginForm() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loginData, setLogindata] = useState<ILogin>({
    username: '',
    password: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setLogindata((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const { token, userId, message } = (await loginFetch(
      loginData
    )) as FetchLoginOutput

    if (!message) {
      saveToken(token)
      saveUserId(userId)
      navigate('/tasks')
    } else setErrorMessage(message)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>LoginForm</h3>
      <label htmlFor="username">
        <input
          onChange={handleChange}
          type="username"
          id="username"
          placeholder="username"
        />
      </label>
      <label htmlFor="password">
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="password"
        />
      </label>
      <button type="submit">Login</button>
      {errorMessage !== null && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  )
}
