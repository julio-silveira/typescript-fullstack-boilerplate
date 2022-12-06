import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLogin, userRegister } from '../../helpers/userFetch'
import { IUser } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { ContextType } from '../../@types/ContextTypes'
import { Modal } from '../Modal'
import { IFetchLoginMessage } from '../../@types/taskTypes'

const FORM_INITIAL_STATE = {
  username: '',
  password: ''
}

export default function LoginForm() {
  const { openModalWithContent, isModalOpen } = useContext(
    AppContext
  ) as ContextType

  const navigate = useNavigate()
  const [register, setRegister] = useState(false)
  const [formData, setFormData] = useState<IUser>(FORM_INITIAL_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (register) {
      const { message, status } = (await userRegister(
        formData
      )) as IFetchLoginMessage
      console.log(status)

      if (status === 201 && message !== undefined) {
        openModalWithContent(message)
        setRegister(false)
        setFormData(FORM_INITIAL_STATE)
      } else if (message !== undefined) {
        openModalWithContent(message)
      }
    } else {
      const { message } = (await userLogin(formData)) as IFetchLoginMessage
      if (!message) {
        setFormData(FORM_INITIAL_STATE)
        navigate('/tasks')
      } else {
        openModalWithContent(message)
      }
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
      {isModalOpen && <Modal />}
    </form>
  )
}
