import { Routes, Route } from "react-router-dom";

import './App.css';

import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from "./Dashboard";

// update README.md to include dependencies to download as well as guide on naviagaton (if environement should be updated)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );

}

export default App;