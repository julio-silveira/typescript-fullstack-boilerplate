import React, { useEffect, useState } from 'react'
import { getTasks } from '../../helpers/fetch'

export default function Tasks() {
  const [taskList, setTaskList] = useState([])
  useEffect((): void => {
    const fetchtasks = async () => {
      const tasks = await getTasks()
      setTaskList(tasks)
    }
    fetchtasks()
  }, [])
  return (
    <div>
      Tasks
      {taskList.map(({ title }, index) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  )
}
