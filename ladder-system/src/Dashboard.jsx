import { Link } from "react-router-dom";
import './App.css';

const testbutton = () => {
    console.log('you click a thing!')
}

// Popup State
function ruleBox() {
    alert("Only 6 players on the floor at any given time: 3 in the front row and 3 in the back row.");
  }

export function Dashboard() {
    return (
        <div>
                <h3>dashboard</h3>
                <Link to="/Ladder">
                    <button class="dash_btn">NGVB Volleyball Ladder Spring 2023</button>
                </Link>
                <br></br>
                <Link to="/Ladder">
                    <button class="dash_btn">NGVB Volleyball 2's Ladder Spring 2023</button>
                </Link>
                <br></br>
                <Link to="/Ladder">
                    <button class="dash_btn">6v6 casual</button><br></br>
                </Link>
                <br></br>

                <Link to="/Ladder">
                    <button class="dash_btn">Ladder</button>
                </Link>
                <br></br>
                <Link to="/Team">
                    <button class="dash_btn">Team</button>
                </Link>
                <br></br>
                <br></br>
                <Link to="/">
                    <a href="" class="dash_lnk">Rules</a>
                </Link>
                <br></br>
                <Link to="/">
                <a href="" class="dash_lnk">Back</a>
                </Link>
                </div>
    )
}