import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Pen, Loader } from 'lucide-react'

interface AddTodoProps {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
  isLoading?: boolean
}

const AddTodo: React.FC<AddTodoProps> = ({ value, onChange, onAdd, isLoading = false }) => {
  return (
    <div className="mb-6 flex gap-2">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add new todo..."
        className="grow p-4 rounded-[15px] bg-pink-50 text-pink-700 border-pink-200 placeholder:text-pink-400 focus:border-pink-400"
      />
      <Button
        onClick={onAdd}
        disabled={isLoading}
        className="p-4 bg-pink-500 text-pink-50 rounded-[15px] hover:bg-pink-600 transition-colors min-w-14 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : <Pen className="w-6 h-6" />}
      </Button>
    </div>
  )
}

export default AddTodo
