import { Link } from "react-router-dom";
import './App.css';

export function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            
            <Link to="/" className="link">
                <button>Back</button>
            </Link>
        </div>
    )
}