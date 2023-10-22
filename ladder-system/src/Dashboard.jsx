import { Link } from "react-router-dom";
import './App.css';

export function Dashboard() {
    return (
        <div>
                <h3>dashboard</h3>
                <Link to="/Ladder">
                    <button className="dash_btn">NGVB Volleyball Ladder Spring 2023</button>
                </Link>
                <br></br>
                <Link to="/Ladder">
                    <button className="dash_btn">NGVB Volleyball 2's Ladder Spring 2023</button>
                </Link>
                <br></br>
                <Link to="/Ladder">
                    <button className="dash_btn">6v6 casual</button><br></br>
                </Link>
                <br></br>

                <Link to="/Ladder">
                    <button className="dash_btn">Ladder</button>
                </Link>
                <br></br>
                <Link to="/Team">
                    <button className="dash_btn">Team</button>
                </Link>
                <br></br>
                <br></br>
                <Link to="/">
                    <button className="dash_lnk">Rules</button>
                </Link>
                <br></br>
                <Link to="/">
                    <button className="dash_lnk">Back</button>
                </Link>
        </div>
    )
}
