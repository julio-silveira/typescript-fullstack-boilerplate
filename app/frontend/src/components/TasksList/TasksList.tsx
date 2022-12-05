import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { ITaskState } from '../../@types/taskTypes'
import AppContext from '../../context/AppContext'
import { deleteTask, editTask } from '../../helpers/taskFetch'

interface IOnEditTask {
  onEdit: boolean
  task: number | null
}

const INITIAL_ON_EDIT_TASK: IOnEditTask = {
  onEdit: false,
  task: null
}

const TasksList: React.FC = () => {
  const { userTasks, updateTasks } = useContext(AppContext) as ContextType

  const [onEditTask, setOnEditTask] =
    useState<IOnEditTask>(INITIAL_ON_EDIT_TASK)
  const [taskValues, setTaskValues] = useState<ITaskState>({
    status: false,
    description: ''
  })

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    const newValue = type === 'checkbox' ? !checked : value
    setTaskValues((prevState) => ({
      ...prevState,
      [name]: newValue
    }))
  }

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type } = event.target
    const componentId = Number(id)
    if (type === 'checkbox' && !onEditTask.onEdit) {
      const { id, userId, status, description } = userTasks[componentId]
      await editTask({ id, userId, status: !status, description })
      updateTasks()
    }
  }

  const handleEditBtn = async (
    index: number,
    id: number | string,
    userId: number | string
  ) => {
    if (onEditTask.onEdit) {
      const { status, description } = taskValues
      await editTask({ id, userId, status, description })
      updateTasks()
      setOnEditTask(INITIAL_ON_EDIT_TASK)
    } else {
      const { status, description } = userTasks[index]
      setTaskValues({ status, description })
      setOnEditTask({ onEdit: true, task: index })
    }
  }

  const handleDelBtn = async (id: number | string, userId: number | string) => {
    await deleteTask(id, userId)
    updateTasks()
  }

  return (
    <ul>
      {userTasks.map(({ id, userId, status, description }, index) => (
        <li style={{ margin: '10px' }} key={index}>
          {onEditTask.onEdit && onEditTask.task === index ? (
            <div>
              <label htmlFor={`${index}`}>
                <input
                  id={`${index}`}
                  name="status"
                  checked={status}
                  type="checkbox"
                  onChange={handleCheck}
                />
              </label>
              <label htmlFor="taskDescription">
                <input
                  id="taskDescription"
                  name="description"
                  value={taskValues.description}
                  type="text"
                  onChange={handleChange}
                />
              </label>
            </div>
          ) : (
            <div>
              <label htmlFor={`${index}`}>
                <input
                  id={`${index}`}
                  name="status"
                  checked={status}
                  type="checkbox"
                  onChange={handleCheck}
                />
              </label>
              <span>{description}</span>
            </div>
          )}
          <button
            onClick={() => handleEditBtn(index, id, userId)}
            type="button"
          >
            Editar Tarefa
          </button>
          <button onClick={() => handleDelBtn(id, userId)} type="button">
            Excluir Editar
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TasksList
