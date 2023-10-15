import { Link } from "react-router-dom";
import './App.css';

export function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            
            <Link to="/" className="link">
                <button>Back</button>
            </Link>

            <h1>Ladder</h1>
            <Link to="/Ladder" className="link">
                <button>Ladder</button>
            </Link>
            
            <h1>Team</h1>
            <Link to="/Team" className="link">
                <button>Team</button>
            </Link>
        </div>
    )
}