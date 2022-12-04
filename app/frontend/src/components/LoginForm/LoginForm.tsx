import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FetchLoginOutput } from '../../@types/fetch'
import { loginFetch, registerUser } from '../../helpers/fetch'
import { saveToken, saveUserId } from '../../helpers/localStorage'

interface IForm {
  username: string
  password: string
}

const FORM_INITIAL_STATE = {
  username: '',
  password: ''
}

export default function LoginForm() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [register, setRegister] = useState(false)
  const [formData, setFormData] = useState<IForm>(FORM_INITIAL_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (register) {
      await registerUser(formData)

      setRegister(false)
      setFormData(FORM_INITIAL_STATE)
    } else {
      const { token, userId, message } = (await loginFetch(
        formData
      )) as FetchLoginOutput

      if (!message) {
        saveToken(token)
        saveUserId(userId)
        setFormData(FORM_INITIAL_STATE)
        navigate('/tasks')
      } else setErrorMessage(message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{register ? 'RegisterForm' : 'LoginForm'}</h3>
      <label htmlFor="username">
        <input
          onChange={handleChange}
          value={formData.username}
          type="username"
          id="username"
          placeholder="username"
        />
      </label>
      <label htmlFor="password">
        <input
          onChange={handleChange}
          value={formData.password}
          type="password"
          id="password"
          placeholder="password"
        />
      </label>
      {register ? (
        <section>
          <button type="submit">Registrar</button>
          <span>
            Deseja fazer login?
            <button type="button" onClick={() => setRegister(false)}>
              Voltar a página de login
            </button>
          </span>
        </section>
      ) : (
        <section>
          <button type="submit">Login</button>
          <span>
            Não tem conta?
            <button type="button" onClick={() => setRegister(true)}>
              Cadastre-se
            </button>
          </span>
        </section>
      )}

      {errorMessage !== null && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  )
}
