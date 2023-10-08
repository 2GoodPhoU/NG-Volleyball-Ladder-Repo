import { Routes, Route } from "react-router-dom";

import './App.css';

import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from "./Dashboard";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
