import { useState } from 'react'
import Create from './components/Create';
import Read from './components/Read';

const App = () => {
  const [todos, settodos] = useState([
    {
      id : 1,
      title : "Learning React",
      isCompleted : false
    }
  ])
  return (
    <div className="min-h-screen bg-[#16233d] px-20 py-16">
      <div className="flex justify-between gap-20">
        <Create todos = {todos} settodos = {settodos}/>
        <Read todos = {todos} settodos = {settodos}/>
      </div>
    </div>

  )
}

export default App