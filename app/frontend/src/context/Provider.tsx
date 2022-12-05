import React, { useCallback, useEffect, useState } from 'react'
import { ITaskData } from '../@types/taskTypes'
import { getTasks } from '../helpers/taskFetch'
import AppContext from './AppContext'

interface iProps {
  children: React.ReactElement
}

const Provider: React.FC<iProps> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [userTasks, setUserTasks] = useState<ITaskData[]>([])

  const updateTasks = useCallback(async () => {
    setLoading(true)
    const tasksData = await getTasks()

    if (tasksData !== undefined) {
      const tasks = (await getTasks()) as ITaskData[]

      setUserTasks(tasks)
    }
    setLoading(false)
  }, [])

  useEffect((): void => {
    const fetchtasks = async () => {
      await updateTasks()
    }

    fetchtasks()
  }, [updateTasks])

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        userTasks,
        setUserTasks,
        updateTasks
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default Provider
