import React, { useState } from 'react'
import { FetchTasksOutput } from '../../@types/fetch'
import { deleteTask, editTask } from '../../helpers/fetch'

type TasksListsProps = {
  tasksList: FetchTasksOutput[]
  updateList: boolean
  setUpdateList: (value: boolean) => void
}

interface IOnEditTask {
  onEdit: boolean
  task: number | null
}

const INITIAL_ON_EDIT_TASK: IOnEditTask = {
  onEdit: false,
  task: null
}

const TasksList: React.FC<TasksListsProps> = ({
  tasksList,
  updateList,
  setUpdateList
}) => {
  const [onEditTask, setOnEditTask] =
    useState<IOnEditTask>(INITIAL_ON_EDIT_TASK)
  const [taskValues, setTaskValues] = useState({ title: '', description: '' })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setTaskValues((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleEditBtn = async (
    index: number,
    id: number | string,
    userId: number | string
  ) => {
    if (onEditTask.onEdit) {
      const { title, description } = taskValues
      await editTask({ id, userId, title, description })
      setUpdateList(!updateList)
      setOnEditTask(INITIAL_ON_EDIT_TASK)
    } else {
      const { title, description } = tasksList[index]
      setTaskValues({ title, description })
      setOnEditTask({ onEdit: true, task: index })
    }
  }

  const handleDelBtn = async (id: number | string, userId: number | string) => {
    await deleteTask(id, userId)
    setUpdateList(!updateList)
  }

  return (
    <ul>
      {tasksList.map(({ id, userId, title, description }, index) => (
        <li style={{ margin: '10px' }} key={index}>
          {onEditTask.onEdit && onEditTask.task === index ? (
            <div>
              <label htmlFor="taskTitle">
                <input
                  id="taskTitle"
                  name="title"
                  value={taskValues.title}
                  type="text"
                  onChange={handleChange}
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
            <span>{`${title}:${description} `}</span>
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
