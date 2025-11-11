import React from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="todo-checkbox"
          />
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
