import { useState } from 'react'
import './App.css'
import R3fDemo from './components/R3fDemo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App h-screen">
      <R3fDemo />
    </div>
    )
}

export default App
