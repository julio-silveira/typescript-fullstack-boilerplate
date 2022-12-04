import React, { useState } from 'react'
import { saveTask } from '../../helpers/fetch'

interface ITask {
  title: string
  description: string
}

interface TaskFormProps {
  updateList: boolean
  setUpdateList: (value: boolean) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ updateList, setUpdateList }) => {
  const [taskData, setTaskData] = useState<ITask>({
    title: '',
    description: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setTaskData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const message = await saveTask(taskData)
    setUpdateList(!updateList)
    console.log(message)
  }
  return (
    <article>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <input onChange={handleChange} type="text" id="title"></input>
        </label>
        <label htmlFor="description">
          <input onChange={handleChange} id="description"></input>
        </label>
        <button type="submit">Salvar Tarefa</button>
      </form>
    </article>
  )
}

export default TaskForm
