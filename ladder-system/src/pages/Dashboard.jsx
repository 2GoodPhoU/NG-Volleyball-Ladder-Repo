import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
/* we don't need this
import { Join } from "../components/join";
*/
import { CssBaseline, TextField, Grid, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListSubheader, ListItemButton }from '@mui/material';

import ng_1 from "../images/ng_1.png";

const handleSendInvite = (e) => {
    e.preventDefault();
    console.log("Invite Sent!");
};

export function Dashboard() {
    //to view the list of types of ladders
    const [ladderTournaments, setLadderTournaments] = useState([]);

    //for the Join and Show functionality
    const [showBackButton, setShowBackButton] = useState(false);
    const [showOtherButtons, setShowOtherButtons] = useState(true); // Add this state

    //Get the list of ladders
    const [ladderMap, setLadderMap] = useState('');
    const [teamMap, setTeamMap] = useState([]);
    const [isToggled, setIsToggled] = useState(false);

    // Match variables
    const [ladderId, setLadderId] = useState('');
    const [challengerTeamId, setChallengerTeamId] = useState('');
    const [opponentTeamId, setOpponentTeamId] = useState('');

    const [challengerScore, setChallengerScore] = useState('');
    const [opponentScore, setOpponentScore] = useState('');

    useEffect(() => {
        getLadderTournaments();
        getLadderMap();
        getTeamMap();
    }, []);

    async function getLadderTournaments() {
        const { data } = await supabase
        .from('ladder_tournaments')
        .select();
        
        setLadderTournaments(data);
    }
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


    // Handle click event to set iframe URL and show the back button
    // and hide all other buttons
    const handleJoinClick = () => {
        setShowBackButton(true);
        setShowOtherButtons(false); // Hide other buttons
        
    };
    // Same but reversed
    const handleBackClick = () => {
        setShowBackButton(false);
        setShowOtherButtons(true); // Show other button
    };

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
                

                <ButtonGroup size="medium">
                    {/*  */}
                {showBackButton ? ( //Hides the top three buttons
                    
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                            onClick={handleBackClick}
                        >
                            Back
                        </Button>

                    ) : (
                        <><Button
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
                               Go to /Ladder Page
                            </Link>
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                            onClick={handleJoinClick}
                        >
                            Join a Ladder
                        </Button>
                        </>
                    )}

                </ButtonGroup>



                <Typography component="h3">
                    Ladder
                </Typography>
                {showBackButton ? ( //Changes everything inside the 
                     <>
                    {/* Dummy list */}
                    
                    <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
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

                        {/* JUST A PLACEHOLDER FOR NOW! */}
                        {/* ////Commented out lines below
                        <Typography>Hello Tournaments List</Typography> 
                        <br></br><br></br>
                        Competitive 6v6
                        <br></br><br></br>
                        Casual 6v6
                        <br></br><br></br>
                        Competitive 2v2
                        <br></br><br></br>
                        Casual 2v2
                        <br></br><br></br>
                        Competitive 4v4
                        <br></br><br></br>
                        Casual 4v4
                        <br></br><br></br>
                        Let's Go
                        <br></br><br></br>
                        */}
                        
                    </Paper>

                </>

                ) : (
                <>
                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    <List>
                        {ladderTournaments.map((tournament, i) =>
                            <ListItem
                                key={i}
                                
                            >
                                <ListItemText> {tournament.ladder_name} </ListItemText>
                                <ListItemText> {tournament.ladder_size} vs {tournament.ladder_size} </ListItemText>
                                <ListItemButton selected={0}>
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
                </>
                )}

                <ButtonGroup size="medium">
                    {showOtherButtons && ( // Conditionally render these buttons
                        <>
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
                        </>
                    )}
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
