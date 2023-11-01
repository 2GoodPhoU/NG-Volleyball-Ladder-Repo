import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import { Join } from "../components/join";


const handleSendInvite = (e) => {
    e.preventDefault();
    console.log("Invite Sent!");
};

export function Ladder() {
    const [ladderMap, setLadderMap] = useState('');
    const [teamMap, setTeamMap] = useState([]);
    const [isToggled, setIsToggled] = useState(false);

    // Match variables
    const [ladderId, setLadderId] = useState('');
    const [challengerTeamId, setChallengerTeamId] = useState('');
    const [opponentTeamId, setOpponentTeamId] = useState('');

    const [challengerScore, setChallengerScore] = useState('');
    const [opponentScore, setOpponentScore] = useState('');

    const [challengerTeamName, setChallengerTeamName] = useState('');
    const [opponentTeamName, setOpponentTeamName] = useState('');

    const [formError, setFormError] = useState('');

    useEffect(() => {
        getLadderMap();
        getTeamMap();
    }, []);

    async function getLadderMap() {
        const { data, error } = await supabase
            .from('ladder_tournaments')
            .select()
            .eq('ladder_id', 4)
            .single();

        if (error) {
            setLadderMap(null);
            console.log(error);
        }

        if (data) {
            setLadderMap(data);
            setLadderId(data.ladder_id);
        }
    }

    async function getTeamMap() {
        const { data } = await supabase
        .from('teams')
        .select();
        
        setTeamMap(data);
    }

    // Fetch team name
    const handleFetchTeamName = async (e) => {
        e.preventDefault();
    
        if(!challengerTeamId) {
            setFormError('Missing Credentials');
            return;
        }
    
        const{data, error} = await supabase
            .from('teams')
            .select("team_name")
            .eq('team_id', challengerTeamId)
            .single();

        console.log(challengerTeamId);
    
        if(error) {
            setChallengerTeamName(null);
            setFormError('Team does not exist');
            console.log(error);
        }
    
        if(data) {
            setChallengerTeamName(data.team_name);
            setFormError(null);

            console.log(data);
        }
    }

    // Create a match
    const handleCreateMatch = async (e) => {
        e.preventDefault();
    
        if(!challengerTeamId || !opponentTeamId) {
            setFormError('Missing Credentials');
            return;
        }
    
        const{data, error} = await supabase
            .from('match_history')
            .insert([{
                ladder_id:ladderId, 
                challenger_id: challengerTeamId, 
                opponent_id: opponentTeamId
            }]);
    
        if(error) {
            console.log(error);
            setFormError('Match not created');
        }
    
        if(data) {
            console.log(data);
            setFormError('Match created');
        }
    };

    // Delete a match
    const handleDeleteMatch = async (e) => {
        e.preventDefault();
    
        if(!challengerTeamId || !opponentTeamId) {
            setFormError('Missing Credentials');
            return;
        }
    
        const{data, error} = await supabase
            .from('match_history')
            .delete()
            .eq('ladder_id', ladderId)
            .eq('challenger_id', challengerTeamId)
            .eq('opponent_id', opponentTeamId);
    
        if(error) {
            console.log(error);
            setFormError('Match not deleted');
        }
    
        if(data) {
            console.log(data);
            setFormError('Match deleted');
        }
    };

    // Update a match score
    const handleUpdateMatchScore = async (e) => {
        e.preventDefault();
    
        if(!challengerTeamId || !opponentTeamId) {
            setFormError('Missing Credentials');
            return;
        }
    
        const{data, error} = await supabase
            .from('match_history')
            .update({challenger_score: challengerScore, opponent_score: opponentScore})
            .eq('ladder_id', ladderId)
            .eq('challenger_id', challengerTeamId)
            .eq('opponent_id', opponentTeamId);
    
        if(error) {
            console.log(error);
            setFormError('Match not updated');
        }
    
        if(data) {
            console.log(data);
            setFormError('Match updated');
        }
    };


    return (
        <div className="ladder-team-page">
            <header>
                <div className="ladder-name-container">
                    <h3>{ladderMap.ladder_name}</h3>
                </div>
            </header>

            <div>
                {teamMap.map((team, i) =>
                    <div className="ladder-outer-container" key={i}>
                        <div className="ladder-team-id">
                            <h4>{team.team_id}</h4>
                        </div>
                        <Link to="/Team">
                            <div className="ladder-center-div">
                                <h4> {team.team_name} </h4>
                                <small> {team.team_wins_score} - {team.team_lose_score} </small>
                            </div>
                        </Link>
                        <button className = "ladder-btn" onClick={handleSendInvite}><h5>Challenge</h5></button>
                    </div>
                )}
            </div>

            <button onClick={() => setIsToggled(!isToggled)}>Join</button>

            {/* Test Fetching Team Name */}
            {/* <div>
                <form onSubmit = {handleFetchTeamName}>
                    <label>Challenger</label>
                    <input
                        tyoe = "text"
                        id = "challengerTeamId"
                        value = {challengerTeamId}
                        onChange = {(e) => setChallengerTeamId(e.target.value)}>
                    </input>

                    <button type="submit">Fetch Challenger Team Id</button>
                    {challengerTeamId && <p>{challengerTeamId}</p>}
                    {challengerTeamName && <p>{challengerTeamName}</p>}
                    {formError && <p>{formError}</p>}
                </form>
            </div> */}
            
            {/* Test Create Match */}
            {/* <div>
                <form onSubmit = {handleCreateMatch}>
                    <label>Match Teams</label>
                    
                    <input
                        tyoe = "text"
                        id = "challengerTeamId"
                        value = {challengerTeamId}
                        onChange = {(e) => setChallengerTeamId(e.target.value)}>
                    </input>

                    <input
                        tyoe = "text"
                        id = "opponentTeamId"
                        value = {opponentTeamId}
                        onChange = {(e) => setOpponentTeamId(e.target.value)}>
                    </input>

                    <button type="submit">Submit Match</button>
                    {challengerTeamId && <p>{challengerTeamId}</p>}
                    {opponentTeamId && <p>{opponentTeamId}</p>}
                    {formError && <p>{formError}</p>}
                </form>
            </div> */}


            {/* Test Delete Match */}
            {/* <div>
                <form onSubmit = {handleDeleteMatch}>
                    <label>Delete Match </label>
                    
                    <input
                        tyoe = "text"
                        id = "challengerTeamId"
                        value = {challengerTeamId}
                        onChange = {(e) => setChallengerTeamId(e.target.value)}>
                    </input>

                    <input
                        tyoe = "text"
                        id = "opponentTeamId"
                        value = {opponentTeamId}
                        onChange = {(e) => setOpponentTeamId(e.target.value)}>
                    </input>

                    <button type="submit">Delete Match</button>
                    {challengerTeamId && <p>{challengerTeamId}</p>}
                    {opponentTeamId && <p>{opponentTeamId}</p>}
                    {formError && <p>{formError}</p>}
                </form>
            </div>  */}

            {/* Test Update Match Score */}
            {/* <form onSubmit = {handleUpdateMatchScore}>
                <label>Update Match Score</label>

                <input
                    tyoe = "text"
                    id = "challengerTeamId"
                    value = {challengerTeamId}
                    onChange = {(e) => setChallengerTeamId(e.target.value)}>
                </input>

                <input
                    tyoe = "text"
                    id = "opponentTeamId"
                    value = {opponentTeamId}
                    onChange = {(e) => setOpponentTeamId(e.target.value)}>
                </input>

                <input
                    tyoe = "text"
                    id = "challengerScore"
                    value = {challengerScore}
                    onChange = {(e) => setChallengerScore(e.target.value)}>
                </input>

                <input
                    tyoe = "text"
                    id = "opponentScore"
                    value = {opponentScore}
                    onChange = {(e) => setOpponentScore(e.target.value)}>
                </input>

                <button type="submit">Update Match Score</button>
                {challengerTeamId && <p>{challengerTeamId}</p>} 
                {opponentTeamId && <p>{opponentTeamId}</p>} 
                {challengerScore && <p>{challengerScore}</p>}   
                {opponentScore && <p>{opponentScore}</p>}   
                {formError && <p>{formError}</p>}   

            </form> */}
            
            <footer>
                <div className="ladder-footer-container">
                    <div className="ladder-footer-div"><h4>Ladder Match History</h4></div>
                    <div className="ladder-footer-div"><h4>Team Match History</h4></div>
                    {/* {isToggled && <Join />} */}
                    {isToggled ? <Join /> : null}
                </div>
            </footer>
        </div>
    )
}