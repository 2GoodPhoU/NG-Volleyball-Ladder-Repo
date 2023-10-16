import { Link } from "react-router-dom";
import './ladder_team.css';

const ladderName = "Ladder Name";
const ladderTeams = [
    {name: 'Team 1', wins: '15', lossess: '0'},
    {name: 'Team 2', wins: '14', lossess: '1'},
    {name: 'Team 3', wins: '13', lossess: '2'},
    {name: 'Team 4', wins: '12', lossess: '3'},
    {name: 'Team 5', wins: '11', lossess: '4'},
    {name: 'Team 6', wins: '10', lossess: '5'},
    {name: 'Team 7', wins: '9', lossess: '6'},
    {name: 'Team 8', wins: '8', lossess: '7'},
    {name: 'Team 9', wins: '7', lossess: '8'},
    {name: 'Team 10', wins: '6', lossess: '9'},
    {name: 'Team 11', wins: '5', lossess: '10'},
    {name: 'Team 12', wins: '4', lossess: '11'},
    {name: 'Team 13', wins: '3', lossess: '12'},
    {name: 'Team 14', wins: '2', lossess: '13'},
    {name: 'Team 15', wins: '1', lossess: '14'},
];

export function Ladder() {
    return (
        <div className="page">
            <header>
                <div className="ladder-name-container">
                    <h3>{ladderName}</h3>
                </div>
            </header>

            <body>
                {ladderTeams.map((team) => (
                    <div className= "ladder-list-container" key={team.name}>
                        <div>{team.wins} - {team.lossess}</div>
                        <h4>{team.name}</h4>
                        <button>Challenge</button>
                    </div>
                ))}
                
            </body>

            <footer>
                <div className="ladder-footer-container">
                    <h5>About Us</h5>
                    <h5>Contact Us</h5>
                    <h5>Terms of Service</h5> 
                </div>
            </footer>

            <Link to="/Dashboard" className="link">
                    <button>Dashboard</button>
                </Link>
            <Link to="/Team" className="link">
                <button>Team</button>
            </Link>
        </div>
    )
}