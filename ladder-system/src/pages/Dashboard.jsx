import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import { CssBaseline, TextField, Grid, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListSubheader, ListItemButton }from '@mui/material';

import ng_1 from "../images/ng_1.png";

// export function Dashboard( {user} ) {
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
                <Box
                    component="img"
                    sx={{
                        height: 150,
                        width: 400,
                        maxHeight: { xs: 150, md: 150 },
                        maxWidth: { xs: 400, md: 400 },
                        paddingBottom: 2
                    }}
                    src= {ng_1} 
                    alt="Northrop Grumman logo"
                />
                <Typography component="h1" variant="h5">
                    Dashboard
                </Typography>
                <h1> Email: { JSON.parse(window.localStorage.getItem('user')).email } </h1>
                <ButtonGroup size="medium">
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

                <Typography component="h3">
                    Ladder
                </Typography>

                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    <List>
                        {ladderTournaments.map((tournament, i) =>
                            <ListItem key={i}>
                                <ListItemText> {tournament.ladder_name} </ListItemText>
                                <ListItemText> {tournament.ladder_size} vs {tournament.ladder_size} </ListItemText>
                                <ListItemButton selected={false}>
                                    <Link to="/Ladder">
                                        <ListItemText>
                                            View
                                        </ListItemText>
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Paper>

                <ButtonGroup size="medium">
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

                        <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: '150%', height: '50%', mt: 3, mb: 2 }}
                        >
                            <Link to="/">
                                Log Out
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
