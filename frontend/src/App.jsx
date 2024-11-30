import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GetData from "../Pages/GetData";
import AddData from "../Pages/AddData";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Sample React App</h1>
      <GetData />
    </>
  );
}

export default App;
