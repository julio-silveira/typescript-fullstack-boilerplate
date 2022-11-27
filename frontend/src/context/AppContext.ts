import React from 'react'
import { ContextType } from '../@types/context'

const AppContext = React.createContext<ContextType | null>(null)

export default AppContext
