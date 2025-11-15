import React, { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Pen, Trash2, Check, X } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onUpdate: (id: number, newText: string) => void
  onDelete: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const handleEdit = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const handleSave = () => {
    if (editingId !== null && editText.trim()) {
      onUpdate(editingId, editText.trim())
      setEditingId(null)
      setEditText('')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <ul className="list-none p-0 m-0">
      {todos.map(todo => (
        <li key={todo.id} className="flex items-center bg-pink-50 rounded-[15px] p-4 mb-2 shadow-[0_4px_10px_rgba(219,112,147,0.1)] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_6px_15px_rgba(219,112,147,0.2)]">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="mr-4 border-pink-500 data-[state=checked]:bg-pink-500 data-[state=checked]:text-pink-50 scale-[1.2]"
          />
          <div className="flex-grow mr-2">
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-0 outline-none text-xl text-pink-700"
                autoFocus
              />
            ) : (
              <span className={`text-xl ${todo.completed ? 'text-pink-500 opacity-70 line-through' : 'text-pink-700'}`}>
                {todo.text}
              </span>
            )}
          </div>
          {editingId === todo.id ? (
            <div className="flex space-x-1">
              <Button
                onClick={handleSave}
                className="p-2 bg-green-500 text-white rounded font-bold transition-all duration-100 hover:bg-green-600 active:translate-y-1"
                style={{ boxShadow: '0 4px 0 0 #15803d' }}
              >
                <Check className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleCancel}
                className="p-2 bg-gray-500 text-white rounded font-bold transition-all duration-100 hover:bg-gray-600 active:translate-y-1"
                style={{ boxShadow: '0 4px 0 0 #374151' }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="flex space-x-1">
              <Button
                onClick={() => handleEdit(todo.id, todo.text)}
                variant="ghost"
                size="sm"
                className="hover:bg-pink-200"
              >
                <Pen className="w-4 h-4 text-pink-600" />
              </Button>
              <Button
                onClick={() => onDelete(todo.id)}
                variant="ghost"
                size="sm"
                className="hover:bg-red-200"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TodoList
