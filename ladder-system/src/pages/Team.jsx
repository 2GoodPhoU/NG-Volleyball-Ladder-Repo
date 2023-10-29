import { Link } from "react-router-dom";

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
        <div className="ladder-team-page">
            <header>
                <div className="team-name-container">
                    <h3>{teamName}</h3>
                    <h3>{teamWins} - {teamLosses}</h3>
                </div>
            </header>

            <main>
                {teamMembers.map((member) => (
                    <div className= "team-list-container" key={member.name}>
                        <div className="team-list-pfp"><h4>{member.pfp}</h4></div>
                        <div className="team-list-name"><h4>{member.name}</h4></div>
                    </div>
                ))}
                
            </main>
            <footer>
                <div className="team-footer-container">
                    <h3>About Us</h3>
                    <h3>Contact Us</h3>
                    <div className= "team-footer-div">Team Match History</div> 
                </div>
            </footer>
        </div>
    )
}