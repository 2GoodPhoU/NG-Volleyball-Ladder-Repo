import { Link } from "react-router-dom";
import './ladder_team.css';

const teamName = "Team Name";
const teamWins = 0;
const teamLosses = 0;
const teamMembers = [
    {name: 'Team Member 1', pfp: 'pfp1'},
    {name: 'Team Member 2', pfp: 'pfp2'},
    {name: 'Team Member 3', pfp: 'pfp3'},
    {name: 'Team Member 4', pfp: 'pfp4'},
    {name: 'Team Member 5', pfp: 'pfp5'},
    {name: 'Team Member 6', pfp: 'pfp6'},
];
export function Team() {
    return (
        <div className="page">
            <header>
                <div className="ladder-name-container">
                    <h3>{teamName}</h3>
                    <h3>{teamWins} - {teamLosses}</h3>
                </div>
            </header>

            <body>
                {teamMembers.map((member) => (
                    <div className= "ladder-list-container" key={member.name}>
                        <div>{member.pfp}</div>
                        <h4>{member.name}</h4>
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
            <Link to="/Ladder" className="link">
                <button>Ladder</button>
            </Link>
        </div>
    )
}