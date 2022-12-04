import React, { useState } from 'react'
import { ITaskData } from '../@types/taskTypes'
import AppContext from './AppContext'

interface iProps {
  children: React.ReactElement
}

const Provider: React.FC<iProps> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [userTasks, setUserTasks] = useState<ITaskData[]>([])

  return (
    <AppContext.Provider
      value={{ loading, setLoading, userTasks, setUserTasks }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default Provider
