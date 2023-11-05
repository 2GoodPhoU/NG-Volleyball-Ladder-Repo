import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { CssBaseline, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListSubheader, ListItemButton } from '@mui/material';

import ng_1 from "../images/ng_1.png";

import { supabase } from "../supabaseClient";

// export function Team( { user } ) {
export function Team() {
    const [teams, setTeams] = useState([]);

    const user = JSON.parse(window.localStorage.getItem('user'));

    useEffect(() => {
        if (window.localStorage.getItem('user') === null)
            window.location.reload();

        getTeams();
    }, []);

    async function getTeams() {
        const { data } = await supabase
        .from('teams')
        .select()
        .eq('team_captain_id', user.user_id);

        setTeams(data);
    }

    async function insertTeam(tn, tci, atos, rm, pw) {
        const { data, error } = await supabase
        .from('teams')
        .insert({ team_name: tn, team_captain_id: tci, agreed_ToS: atos, recruiting_members: rm, team_password: pw })
        .select();

        window.location.reload();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`${user.user_id} ${user.username} created team`);

        insertTeam(`${user.username}'s TEAM`, user.user_id, true, false, 1234);
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
                    Teams
                </Typography>

                <ButtonGroup size="medium">
                    <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                    >
                        <Link to="/">
                            Team Rules/Info
                        </Link>
                    </Button>
                
                    <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                    >
                        Create a Team
                        {/* <Link to="/Ladder">
                            Create a Team
                        </Link> */}
                    </Button>
                </ButtonGroup>

                <Typography component="h3">
                    Team
                </Typography>

                <h1> Username: { user.username }</h1>

                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    { teams.length === 0 ? (
                        <h1>NOTHING HERE</h1>
                    ) : (
                        <List>
                            {teams.map((team, i) =>
                                <ListItem key={ i }>
                                    <ListItemText> { team.team_name }</ListItemText>
                                    <ListItemText> { team.team_wins } . { team.team_losses } </ListItemText>
                                    <ListItemButton selected={false}>
                                        <Link to="/Team">
                                            <ListItemText>
                                                View
                                            </ListItemText>
                                        </Link>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>
                    )}
                </Paper>

                <ButtonGroup size="medium">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: '150%', height: '50%', mt: 3, mb: 2 }}
                    >
                        <Link to="/Dashboard">
                            Back
                        </Link>
                    </Button>
                </ButtonGroup>
            </Box>
        </Container>
    )
}