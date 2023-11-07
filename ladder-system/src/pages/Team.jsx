import * as React from 'react';
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

import { CssBaseline, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListItemButton, TextField } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';

import ng_1 from "../images/ng_1.png";

import { supabase } from "../supabaseClient";
import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';

// export function Team( { user } ) {
export function Team() {
    const [teams, setTeams] = useState([]);

    const user = JSON.parse(window.localStorage.getItem('user'));

    // Dialog State
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    
    // init Create a Team values
    const [team, setTeam] = useState('');
    const [member, addMember] = useState('');
    const [members, setMembers] = useState([]);
    const [password, setPass] = useState('');

    // Check if Form is Filled
    const formValid = (team != "") && (password != "");


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

    /* handleSubmit (old)
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`${user.user_id} ${user.username} created team`);

        insertTeam(`${user.username}'s TEAM`, user.user_id, true, false, 1234);
    }
    */

    /* handleSubmit (new) */
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            team: data.get("team"),
            members: data.get("members"),
            password: data.get("password"),
        });
        // Reset Fields
        resetForm();
    }

    // Reset Form
    const resetForm = () => {
        setTeam("");
        addMember("");
        setMembers([]);
        setPass("");
    }

    // Add Member
    const addUser = (e) => {
        e.preventDefault();
        
        // Add User to Members array
        
        console.log("user added");

        // Reset Member Field onClick
        //addMember("");
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
                    src={ng_1}
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

                    {/* Create a Team (new) */}
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        sx={{ width: '150%', mt: 3, mb: 2 }}
                    >
                        Create a Team
                    </Button>
                    <Dialog component="form" open={open} onClose={() => { handleClose(); resetForm();}} onSubmit={handleSubmit}>
                        <DialogTitle align="center">Create a Team</DialogTitle>
                        <DialogContent>
                            {/* Team */}
                            <TextField
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                                label="Team Name"
                                name='team'
                                id="team"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                required
                                autoFocus
                            />

                            {/* Add Members */}
                            <TextField
                                value={members}
                                onChange={(e) => setMembers(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                label="Add Member"
                                name='member'
                                id="member"
                                variant="standard"
                                margin="dense"
                                sx={{ width: "75%" }}
                            />
                            {/* Add Member */}
                            <Button
                                sx={{ width: "12%", marginTop: 2, float: "right", }}
                                value={member}
                                onChange={(e) => addMember(e.target.value)}
                                onClick={addUser}>
                                <PersonAddAlt1 />
                            </Button>


                            {/* Password */}
                            <TextField
                                value={password}
                                onChange={(e) => setPass(e.target.value)}
                                label="Team Password"
                                name="password"
                                id="password"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                required
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { handleClose(); resetForm();}}>Cancel</Button>

                            <Button
                                type="submit"
                                disabled={!formValid}
                                onClick={handleClose}>
                                Create Team
                            </Button>
                        </DialogActions>
                    </Dialog>


                    {/* Create a Team (Old)
                    <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                    >
                        Create a Team
                    </Button>
                    */}

                </ButtonGroup>

                <Typography component="h3">
                    Team
                </Typography>

                <h1> Username: {user.username}</h1>

                <Paper style={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>
                    {teams.length === 0 ? (
                        <h1>NOTHING HERE</h1>
                    ) : (
                        <List>
                            {teams.map((team, i) =>
                                <ListItem key={i}>
                                    <ListItemText> {team.team_name}</ListItemText>
                                    <ListItemText> {team.team_wins} . {team.team_losses} </ListItemText>
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