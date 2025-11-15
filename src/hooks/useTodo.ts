import { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export interface TodoContextType {
  todos: Todo[]
  sortedTodos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  updateTodo: (id: number, newText: string) => void
  deleteTodo: (id: number) => void
}

export const useTodo = () => {
  const context = useContext(TodoContext)
  if (!context) throw new Error('useTodo must be used within TodoProvider')
  return context
}
