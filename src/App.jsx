import { useState } from "react";
import "./App.css";
import DefaultScene from "./scene/DefaultScene";
import GlobeScene from "./scene/GlobeScene";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App h-screen">
      <GlobeScene />
    </div>
  );
}

export default App;
