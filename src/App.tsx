import { useState } from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import { Card, CardContent } from './components/ui/card'
import { ScrollArea } from './components/ui/scroll-area'
import ThemeToggle from './components/ThemeToggle'
import { useTodo } from './hooks/useTodo'
import { toast } from "sonner"
import { Toaster } from "sonner"

function App() {
  const { sortedTodos, addTodo, toggleTodo, updateTodo, deleteTodo, todos } = useTodo()
  const [newTodo, setNewTodo] = useState('')
  const [isLoadingAdd, setIsLoadingAdd] = useState(false)

  const handleAdd = () => {
    if (!newTodo.trim() || isLoadingAdd) return
    setIsLoadingAdd(true)
    setTimeout(() => {
      addTodo(newTodo.trim())
      toast("Anda menambahkan todo list baru, semangat!")
      setNewTodo('')
      setIsLoadingAdd(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-8">
      <div className="fixed inset-0 pointer-events-none -z-10">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-2.5 h-2.5 animate-fall ${
              i % 2 === 0 ? 'bg-pink-500 rounded-tl-full rounded-br-full' : 'bg-pink-100 rounded-tr-full rounded-bl-full'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      <Card className="bg-card rounded-[20px] shadow-[0_10px_30px_rgba(219,112,147,0.2)] p-8 max-w-md w-full border-2 border-border">
        <CardContent className="p-0">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-card-foreground drop-shadow-[1px_1px_2px_rgba(255,255,255,0.5)] animate-bounce-custom">Todo List</h1>
            <ThemeToggle />
          </div>
          <AddTodo value={newTodo} onChange={setNewTodo} onAdd={handleAdd} isLoading={isLoadingAdd} />
          <ScrollArea className="h-52">
            <TodoList todos={sortedTodos} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={deleteTodo} />
          </ScrollArea>
          {todos.length === 0 && (
            <p className="text-center text-muted-foreground italic mt-4">No todos yet. Add one above!</p>
          )}
        </CardContent>
      </Card>
      <Toaster position="top-center" />
    </div>
  )
}

export default App
