import { Routes, Route, BrowserRouter, Link} from "react-router-dom";

import './App.css';

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Ladder } from "./pages/Ladder";
import { Team } from "./pages/Team";

// update README.md to include dependencies to download as well as guide on naviagaton (if environement should be updated)

function App() {
  return (
    <BrowserRouter>
      {/* <nav>
          <h1>NG Volleyball Ladder</h1>
          <Link to="/Dashboard">Dashboard</Link>
          <Link to="/">Login</Link>
      </nav> */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Ladder" element={<Ladder />} />
        <Route path="/Team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
