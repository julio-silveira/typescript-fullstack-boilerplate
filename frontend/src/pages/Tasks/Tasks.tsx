import React, { useEffect, useState } from 'react'
import { FetchErrorOutput, FetchTasksOutput } from '../../@types/fetch'
import { TaskForm } from '../../components/TaskForm'
import { TasksList } from '../../components/TasksList'
import { getTasks } from '../../helpers/fetch'

export default function Tasks() {
  const [tasksList, setTasksList] = useState<FetchTasksOutput[]>([])
  const [updateList, setUpdateList] = useState(false)

  useEffect((): void => {
    const fetchtasks = async () => {
      const tasksData = await getTasks()

      const { message } = tasksData as FetchErrorOutput

      if (message === undefined || tasksData === undefined) {
        const tasks = tasksData as FetchTasksOutput[]
        setTasksList(tasks)
      }
    }

    fetchtasks()
  }, [updateList])

  return (
    <main>
      Tasks
      <TaskForm updateList={updateList} setUpdateList={setUpdateList} />
      {tasksList.length > 0 ? (
        <TasksList tasksList={tasksList} />
      ) : (
        <p>Adicione uma Tarefa!</p>
      )}
    </main>
  )
}
