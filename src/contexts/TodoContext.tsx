import React, { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Todo, TodoContextType } from '../hooks/useTodo'

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

interface TodoProviderProps {
  children: ReactNode
}

const defaultTodos: Todo[] = [
  { id: 1, text: 'Tugas Bootcamp Day 6', completed: false },
  { id: 2, text: 'Nonton Materi Bootcamp Day 6', completed: true },
  { id: 3, text: 'Prepare Untuk Kost', completed: false },
  { id: 4, text: 'UTS Drawing', completed: false },
]

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos')
    return stored ? JSON.parse(stored) : defaultTodos
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }])
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo =>
      todo.id !== id
    ))
  }

  const sortedTodos = todos.slice().sort((a, b) => {
    if (a.completed !== b.completed) {
      return (a.completed ? 1 : 0) - (b.completed ? 1 : 0)
    }
    return b.id - a.id
  })

  const value: TodoContextType = {
    todos,
    sortedTodos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
