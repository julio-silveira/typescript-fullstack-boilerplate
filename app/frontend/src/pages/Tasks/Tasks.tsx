import React, { useContext, useEffect, useState } from 'react'
import { ContextType } from '../../@types/context'
import { FetchErrorOutput } from '../../@types/fetch'
import { ITaskData } from '../../@types/taskTypes'
import { TaskForm } from '../../components/TaskForm'
import { TasksList } from '../../components/TasksList'
import AppContext from '../../context/AppContext'
import { getTasks } from '../../helpers/taskFetch'

export default function Tasks() {
  const { loading, setLoading } = useContext(AppContext) as ContextType
  const [tasksList, setTasksList] = useState<ITaskData[]>([])
  const [updateList, setUpdateList] = useState(false)

  useEffect((): void => {
    const fetchtasks = async () => {
      setLoading(true)
      const tasksData = await getTasks()

      const { message } = tasksData as FetchErrorOutput

      if (message === undefined || tasksData === undefined) {
        const tasks = tasksData as ITaskData[]
        setTasksList(tasks)
      }
      setTimeout(() => setLoading(false), 500) // simulando atraso de um fetch em produção
      // setLoading(false)
    }

    fetchtasks()
  }, [updateList, setLoading])

  return (
    <main>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          Tasks
          <TaskForm updateList={updateList} setUpdateList={setUpdateList} />
          {tasksList.length > 0 ? (
            <TasksList
              updateList={updateList}
              setUpdateList={setUpdateList}
              tasksList={tasksList}
            />
          ) : (
            <p>Adicione uma Tarefa!</p>
          )}
        </div>
      )}
    </main>
  )
}
