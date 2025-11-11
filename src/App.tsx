import { useState } from 'react'
import TodoList from './components/TodoList'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  // Dummy data for todos
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Tugas Bootcamp Day 6', completed: false },
    { id: 2, text: 'Nonton Materi Bootcamp Day 6', completed: true },
    { id: 3, text: 'Prepare Untuk Kost', completed: false },
    { id: 4, text: 'UTS Drawing', completed: false },
  ])

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="app-container">
      <div className="sakura">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="todo-card">
        <h1 className="todo-title">Todo List</h1>
        <TodoList todos={todos} onToggle={toggleTodo} />
        {todos.length === 0 && (
          <p className="empty-message">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  )
}

export default App
