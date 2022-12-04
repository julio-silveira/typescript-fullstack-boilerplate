import { ITaskData } from './taskTypes'

export type ContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  userTasks: ITaskData[]
  setUserTasks: (userTasks: ITaskData[]) => void
}
