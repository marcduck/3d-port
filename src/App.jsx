import { useState } from 'react'
import './App.css'
import DefaultScene from './scene/DefaultScene'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App h-screen">
      <DefaultScene />
    </div>
    )
}

export default App
