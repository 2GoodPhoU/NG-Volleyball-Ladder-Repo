import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
/* we don't need this
import { Join } from "../components/join";
*/
import { CssBaseline, TextField, Grid, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListSubheader, ListItemButton }from '@mui/material';
import Popup from "../components/Popup";
import ng_1 from "../images/ng_1.png";

/*
const handleSendInvite = (e) => {
    e.preventDefault();
    console.log("Invite Sent!");
};
*/

export function Dashboard() {
    //to view the list of types of ladders
    const [ladderTournaments, setLadderTournaments] = useState([]);

    //for the Join and Show functionality
    const [showBackButton, setShowBackButton] = useState(false);
    const [showOtherButtons, setShowOtherButtons] = useState(true); // Add this state

    // Popup State
    const [isPopupOpen, togglePopup] = useState(false);

    //Switch between Join and View states
    const [joinLabel, setJoinLabel] = useState("View"); 
    const [ladderLink, setLadderLink] = useState("/Ladder"); 

    /* not in use
    //Get the list of Teams
    const [ladderMap, setLadderMap] = useState('');
    const [teamMap, setTeamMap] = useState([]);
    const [isToggled, setIsToggled] = useState(false);

    // Match variables
    const [ladderId, setLadderId] = useState('');
    */

    useEffect(() => {
        getLadderTournaments();
        //getLadderMap();
        //getTeamMap();
    }, []);

    async function getLadderTournaments() {
        const { data } = await supabase
        .from('ladder_tournaments')
        .select();
        
        setLadderTournaments(data);
    }
    /* not in use
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
    */


    // Handle click event to change label and link and show the back button
    // and hide all other buttons
    const handleJoinClick = () => {
        setShowBackButton(true);    // Show back button
        setShowOtherButtons(false); // Hide other buttons
        setJoinLabel("Join");       // Change label to Join
        setLadderLink("/Ladder");
        
    };
    // Same but reversed
    const handleBackClick = () => {
        setShowBackButton(false);   // Jide back button
        setShowOtherButtons(true);  // Show other buttons
        setJoinLabel("View");       // Change label to View
        setLadderLink("/Ladder");
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
                    {/* Top three buttons  */}
                {showBackButton ? ( //Hides the top three buttons, replaces it with back button
                    
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
                                onClick={togglePopup}
                            >

                                    Ladder Rules/Info
 
                            </Button>
                            {isPopupOpen ? 
                            <Popup
                                title="Ladder Rules and Info"
                                text="Each team consist of 6 players and 6 substitutes. Players can be substituted at any time but if they are to return can only be swapped for the player that replaced them.\n
                                Each team can hit the ball up to three times before the ball must be returned. The defensive team can then try and block or return the ball again hitting it a maximum of three times.\n
                                Games are played up to 25 points and must be won by 2 clear points.\n
                                Violations will be called for the following:\n
                                \tStepping over the base line when serving the ball.\n
                                \tBall hits the net and fails to get over the net (If the ball hits the net and still goes over the net then this is perfectly legal).\n
                                \tPlayers are not allowed to carry, palm or run with the ball.\n
                                \tPlayers must not touch the net with any part of the body. If the net is said to have hit them rather than vice-versa, then this is ok.\n
                                \tThe ball cannot travel under the net.\n
                                \tPlayers cannot reach over the net and hit the ball.\n"
                                closePopup={() => togglePopup(false)}
                                 /> : null}

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
                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    <List>
                        {ladderTournaments.map((tournament, i) =>
                            <ListItem
                                key={i}>
                                <ListItemText> {tournament.ladder_name} </ListItemText>
                                <ListItemText> {tournament.ladder_size} vs {tournament.ladder_size} </ListItemText>
                                <ListItemButton selected={0}>
                                    <Link to={ladderLink}>
                                        <button className = "ladder-btn"><h5>{joinLabel}</h5></button>
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                            
                        )}
                    </List>
                        {/* this is for a specific ladder, not a list of them
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

                        */}
                </Paper>
                
                

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