import { Routes, Route } from "react-router-dom";

import './App.css';

import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from "./Dashboard";
import { Ladder } from "./Ladder";
import { Team } from "./Team";

// update README.md to include dependencies to download as well as guide on naviagaton (if environement should be updated)

function App() {
  // let loggedIn = false;
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Ladder" element={<Ladder />} />
      <Route path="/Team" element={<Team />} />
    </Routes>
  );
}

export default App;
