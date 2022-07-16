import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CustomeRouter from "./Router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CustomeRouter />
    </div>
  );
}

export default App;
