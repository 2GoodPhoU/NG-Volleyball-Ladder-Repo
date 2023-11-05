import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import { CssBaseline, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListItemButton }from '@mui/material';

import ng_1 from "../images/ng_1.png";

export function Dashboard() {
    const [ladderTournaments, setLadderTournaments] = useState([]);

    const user = JSON.parse(window.localStorage.getItem('user'));

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

                { window.localStorage.getItem('user') === null ? (
                    <h1> Guest Mode </h1>
                ) : (
                    <h1> Username: { user.username } </h1>
                )}

                { window.localStorage.getItem('user') === null ? (
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
                    </ButtonGroup>
                ) : (
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

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                        >
                            <Link to="/Ladder">
                                Create a Ladder
                            </Link>
                        </Button>
                    </ButtonGroup>
                )}

                <Typography component="h3">
                    Ladder
                </Typography>

                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    <List>
                        { ladderTournaments.map((tournament, i) =>
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
                
                { window.localStorage.getItem('user') === null ? (
                    <ButtonGroup size="medium">
                        <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: '150%', height: '50%', mt: 3, mb: 2 }}
                        >
                            <Link to="/">
                                Back
                            </Link>
                        </Button>
                    </ButtonGroup>
                ) : (
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
                )}
            </Box>
        </Container>
    )
}