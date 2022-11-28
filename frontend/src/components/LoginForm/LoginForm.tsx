import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginFetch } from '../../helpers/fetch'

interface ILogin {
  username: string
  password: string
}

export default function LoginForm() {
  const navigate = useNavigate()
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
    const token = await loginFetch(loginData)
    localStorage.setItem('token', token)
    navigate('/tasks')
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
    </form>
  )
}
