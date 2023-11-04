import { Routes, Route, BrowserRouter } from "react-router-dom";

import './App.css';

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Ladder } from "./pages/Ladder";
import { Team } from "./pages/Team";
import { Settings } from "./pages/Settings";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      {/* <nav>
          <h1>NG Volleyball Ladder</h1>
          <Link to="/Dashboard">Dashboard</Link>
          <Link to="/">Login</Link>
      </nav> */}
      <Routes>
        <Route exact path="/" element={<Login setUser={ setUser } />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard user={ user } />} />
        <Route path="/Ladder" element={<Ladder />} />
        <Route path="/Team" element={<Team user={ user } />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
