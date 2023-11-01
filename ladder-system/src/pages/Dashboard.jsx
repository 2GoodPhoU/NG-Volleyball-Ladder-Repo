import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import { CssBaseline, TextField, Grid, Box, Typography, Container, Button, ButtonGroup, Paper, List }from '@mui/material';

export function Dashboard() {
    const [ladderTournaments, setLadderTournaments] = useState([]);

    useEffect(() => {
        getLadderTournaments();
    }, []);

    async function getLadderTournaments() {
        const { data } = await supabase
        .from('ladder_tournaments')
        .select();
        
        setLadderTournaments(data);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Dashboard
                </Typography>
                <ButtonGroup size="large">
                        <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                        >
                            <Link to="/">
                                Ladder Rules/Info
                            </Link>
                        </Button>
                    
                        <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                        >
                            <Link to="/Ladder">
                                Join a Ladder
                            </Link>
                        </Button>
                </ButtonGroup>

                {/* can be used in the individual tournaments */}
                {/* <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    <List>
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
                            </div>
                    </List>
                Paper> */}

                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    <List>
                        {ladderTournaments.map((tournament, i) =>
                            <div className="ladder-outer-container" key={i}>
                                <div className="ladder-team-id">
                                    <h4>{tournament.ladder_id}</h4>
                                </div>
                                <Link to="/Ladder">
                                    <div className="ladder-center-div">
                                        <h4> {tournament.ladder_name} </h4>
                                        <small> {tournament.ladder_size} vs {tournament.ladder_size} </small>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </List>
                </Paper>

                <ButtonGroup size="large">
                        <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: '150%', height: '50%', mt: 3, mb: 2 }}
                        >
                            <Link to="/Team">
                                My Teams
                            </Link>
                        </Button>
                    
                        <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: '150%', height: '50%', mt: 3, mb: 2 }}
                        >
                            <Link to="/Settings">
                                Settings
                            </Link>
                        </Button>
                </ButtonGroup>
                </Box>
        </Container>
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
