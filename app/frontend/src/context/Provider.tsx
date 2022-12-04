import React, { useState } from 'react'
import AppContext from './AppContext'

interface iProps {
  children: React.ReactElement
}

const Provider: React.FC<iProps> = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export default Provider
