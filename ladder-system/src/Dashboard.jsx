import { Link } from "react-router-dom";
import './App.css';

import { useState, useEffect } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://wrelwyuqbbtagdszesuh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZWx3eXVxYmJ0YWdkc3plc3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNTI0MzYsImV4cCI6MjAxMjkyODQzNn0.A16btjC6Ukht9JYSwn3bsmPNl3xsysv-9hjUJR7QR2g");


export function Dashboard() {
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
}
