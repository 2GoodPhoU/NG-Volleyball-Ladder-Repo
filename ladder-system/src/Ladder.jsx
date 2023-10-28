import './ladder_team.css';

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

import { Join } from "./components/join";


const ladderName = "Ladder Name";
const ladderTeams = [
    {teamID: '1', name: 'Team 1', wins: '15', lossess: '0'},
    {teamID: '2', name: 'Team 2', wins: '14', lossess: '1'},
    {teamID: '3', name: 'Team 3', wins: '13', lossess: '2'},
    {teamID: '4', name: 'Team 4', wins: '12', lossess: '3'},
    {teamID: '5', name: 'Team 5', wins: '11', lossess: '4'},
    {teamID: '6', name: 'Team 6', wins: '10', lossess: '5'},
    {teamID: '7', name: 'Team 7', wins: '9', lossess: '6'},
    {teamID: '8', name: 'Team 8', wins: '8', lossess: '7'},
    {teamID: '9', name: 'Team 9', wins: '7', lossess: '8'},
    {teamID: '10', name: 'Team 10', wins: '6', lossess: '9'},
    {teamID: '11', name: 'Team 11', wins: '5', lossess: '10'},
    {teamID: '12', name: 'Team 12', wins: '4', lossess: '11'},
    {teamID: '13', name: 'Team 13', wins: '3', lossess: '12'},
    {teamID: '14', name: 'Team 14', wins: '2', lossess: '13'},
    {teamID: '15', name: 'Team 15', wins: '1', lossess: '14'},
];

const handleAcceptChallenge = (e) => {
    e.preventDefault();
    console.log("Challenge Accepted!");
};

const handleSendInvite = (e) => {
    e.preventDefault();
    console.log("Invite Sent!");
};


// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const{data, error} = await supabase
//         .from('teams')
//         .update({team_wins_score: 1})
//         .eq('team_name', 1);

//     if(error) {
//         console.log(error);
//     }

//     if(data) {
//         console.log(data);
//     }
// };




export function Ladder() {
    const [tournament, setTournament] = useState([]);
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        getTournament();
    }, []);

    async function getTournament() {
        const { data } = await supabase
        .from('teams')
        .select();
        
        setTournament(data);
    }

    return (
        <div className="page">
            <header>
                <div className="ladder-name-container">
                    <h3>{ladderName}</h3>
                </div>
            </header>

            <div>
                {tournament.map((team, i) =>
                    <div className="ladder-outer-container" key={i}>
                        <div className="ladder-team-id">
                            <h4>{team.team_position}</h4>
                        </div>
                        <div className="ladder-center-div">
                            <h4> {team.team_name} </h4>
                            <small> {team.team_wins_score} - {team.team_lose_score} </small>
                        </div>
                        <button onClick={handleSendInvite}><h5>Challenge</h5></button>
                    </div>
                )}
            </div>

            {/* <button onClick={() => setIsToggled(!isToggled)}>Join</button>
            <div>
                <form onSubmit = {handleSubmit}>
                    <label>Score</label>
                    <input type="text" placeholder="Your score"/>
                    <input type="text" placeholder="Opponent score"/>
                    <button type="submit">Submit</button>
                </form>
            </div> */}
            
            <footer>
                <div className="ladder-footer-container">
                    <div className="ladder-footer-div"><h4>Ladder Match History</h4></div>
                    <h4></h4>
                    {/* {isToggled && <Join />}
                    {isToggled ? <Join /> : null} */}
                </div>
            </footer>

            <Link to="/Team" className="link">
                <button>Team</button>
            </Link>
        </div>
    )
}