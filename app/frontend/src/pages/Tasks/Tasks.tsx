/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { TaskForm } from '../../components/TaskForm'
import { TasksList } from '../../components/TasksList'
import AppContext from '../../context/AppContext'

export default function Tasks() {
  const { loading, userTasks } = useContext(AppContext) as ContextType

  return (
    <main>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          Tasks
          <TaskForm />
          {userTasks.length > 0 ? <TasksList /> : <p>Adicione uma Tarefa!</p>}
        </div>
      )}
    </main>
  )
}
