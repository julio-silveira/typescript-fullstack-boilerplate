import React from 'react'
import { FetchTasksOutput } from '../../@types/fetch'

type TasksListsProps = {
  tasksList: FetchTasksOutput[]
}

const TasksList: React.FC<TasksListsProps> = ({ tasksList }) => {
  return (
    <article>
      {tasksList.map(({ title }, index) => (
        <p key={index}>{title}</p>
      ))}
    </article>
  )
}

export default TasksList
