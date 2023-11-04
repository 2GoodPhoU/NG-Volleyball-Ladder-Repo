import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import { CssBaseline, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListSubheader, ListItemButton } from '@mui/material';

import ng_1 from "../images/ng_1.png";

import { supabase } from "../supabaseClient";

// export function Team( { user } ) {
export function Team() {

    const user = {username: "teamcaptain1", user_id: 30};

    const [teamIdx, setTeamIdx] = useState([]);

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    async function getTeams() {
        const { data } = await supabase
        .from('teams')
        .select();
        // .eq('team_captain_ids', TESTUSER);

        setTeams(data);

        setTeamIdx(-1);

        console.log(`before team_idx is ${teamIdx}`);

        data.forEach((team, iter) => {
            // console.log(`the team's team captains: ${team.team_captain_ids}`);
            team.team_captain_ids.forEach((id) => {
                console.log(iter);
                console.log(id);
                if (id === user.user_id)
                    setTeamIdx(iter);
            });
        });

        // array1.forEach((element) => console.log(element));

        console.log(`after team_idx is ${teamIdx}`);
        // return teamIdx;
        
        // return (data.length === 1) ? setTeams(data) : false;
    }

    async function insertTeam(tn, tci, atos, rm) {
        const { error } = await supabase
        .from('teams')
        .insert({ team_name: tn, team_captain_ids: tci, agreed_ToS: atos, recruiting_members: rm });

        window.location.reload();

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`${user.user_id} ${user.username} created team`);

        var captains = [user.user_id];
        insertTeam(`${user.username}'s TEAM`, captains, true, false);
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

                <h1> Username: { user.username } </h1>

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

                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    { teamIdx === -1 ? (
                        <h1>NOTHING HERE</h1>
                    ) : (
                        <h1>DATA HERE</h1>
                        // <List>
                        //     {teams.map((team, i) =>
                        //         <ListItem key={i}>
                        //             <ListItemText> {team.ladder_name} </ListItemText>
                        //             <ListItemButton selected={false}>
                        //                 <Link to="/Team">
                        //                     <ListItemText>
                        //                         View
                        //                     </ListItemText>
                        //                 </Link>
                        //             </ListItemButton>
                        //         </ListItem>
                        //     )}
                        // </List>
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