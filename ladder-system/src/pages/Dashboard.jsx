import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function Dashboard() {
    // Define state variables using the "useState" hook
    // "iframeSRC" state variable holds the URL for an embedded iframe
    const [iframeSRC, setIframeSrc] = useState('/Ladder');
    // "showBackButton" state variable determines whether to display a back button
    const [showBackButton, setShowBackButton] = useState(false);

    // Handle click event to set iframe URL and show the back button
    // and hide all other buttons
    const handleJoinClick = () => {
        setIframeSrc('/Register');
        setShowBackButton(true);
    };
    // Same but reversed
    const handleBackClick = () => {
        setIframeSrc('/Ladder');
        setShowBackButton(false);
    };
    return (
        <div>
                <h3>dashboard</h3>

                {showBackButton ? (//This will display when all others are hidden
                <>
                <iframe src={iframeSRC} title="backframe" className="dash-frame"></iframe>
                <br></br>
                <button id="Back" className="dash_btn" onClick={handleBackClick}>
                    Back
                </button>
                </>
            ) : ( //This is the intial page
                <>
                <Link to="/">
                    <button id="rules" className="dash_btn">
                        Ladder Rules/Info</button>
                </Link>
                    <button id="JoinLadder" className="dash_btn" onClick={handleJoinClick}>
                        Join a Ladder</button>
                <br></br>
                <iframe src={iframeSRC} title="myFrame" className="dash-frame"></iframe>
                <br></br>
                <Link to="/Team">
                    <button id="Team" className="dash_btn">
                        My Teams</button>
                </Link>

                <Link to="/Settings">
                    <button id="Settings" className="dash_btn">
                        Settings</button>
                </Link>
                </>
            )}
        </div>
    )
}

/*
    /*
    const [ladderTournaments, setLadderTournaments] = useState([]);

    useEffect(() => {
        getLadder();
    }, []);

    async function getLadder() {
        const { data } = await supabase
        .from('ladder_tournaments')
        .select();
        
        setLadderTournaments(data);
    }
    return (
        <div>
            
            <h3>Dashboard</h3>
            <div>
                {ladderTournaments.map((tournament, i) => 
                    <div key={i}>
                        <Link to="/Ladder">
                            <button className="dash_btn">
                                { tournament.ladder_tournament_name }
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            
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
        */
