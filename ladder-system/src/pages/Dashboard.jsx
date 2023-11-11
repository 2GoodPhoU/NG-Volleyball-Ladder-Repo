import { Link } from "react-router-dom";
import * as React from 'react';
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import { CssBaseline, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListItemButton, TextField } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import ng_1 from "../images/ng_1.png";

import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';

import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';

// Increment Members Array
let nextId = 0;

export function Dashboard() {
    const [ladderTournaments, setLadderTournaments] = useState([]);

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
<<<<<<< Updated upstream
=======
        if (window.localStorage.getItem('user') !== null) isAdmin();
>>>>>>> Stashed changes
        getLadderTournaments();
    }, []);

    async function getLadderTournaments() {
        const { data } = await supabase
        .from('ladder_tournaments')
        .select();
        
        setLadderTournaments(data);
    }

<<<<<<< Updated upstream
=======
    async function isAdmin(){
        const { data } = await supabase
        .from('admin')
        .select()
        .eq('admin_user_id', user.user_id);

        console.log(user.user_id)
        console.log(data);

        if (data.length === 0)
            console.log("User is not an admin");
        else
            setIsUserAdmin(true);
    }

>>>>>>> Stashed changes
    async function insertLadder(ln, ts, atos, ui) {
        const { data: ladder_tournaments_data, error: ladder_tournaments_error } = await supabase
        .from('ladder_tournaments')
        .insert({ ladder_name: ln, agreed_ToS: atos, team_size: ts, ladder_size: ts })
        .select();

        const { data: ladder_moderators_data, error: ladder_moderators_error } = await supabase
        .from('ladder_moderators')
        .insert({ ladder_id: ladder_tournaments_data[0].ladder_id, user_id: user.user_id });

        window.location.reload();
    }

    /* handleSubmit (new) */
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            team: data.get("team"),
            members,
            password: data.get("password"),
        });
        // Reset Fields

        console.log(`${user.user_id} ${user.username} created ladder`);

        insertLadder(`${user.username}'s ladder`, 2, true, user.user_id);

        resetForm();
    }

    // Reset Form
    const resetForm = () => {
        setTeam("");
        addMember("");
        setMembers([]);
        setPass("");
        nextId = 0;
    }

    // Add Member to Members
    function addToTeam(e) {
        e.preventDefault();

        // Add Member to Array
        setMembers([
            ...members,
            { id: nextId++, member: member }
        ]);

        // Testing (WARNING: FIRST ADD IS EMPTY)
        console.log(members);

        // Reset Member Form Field (FIX)
        document.getElementById("member").value = "";
        addMember("");
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
                    <>
                    { isUserAdmin ? (
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
<<<<<<< Updated upstream

                        <Button
                            type="submit"
=======
                        <Button
                            onClick={handleClickOpen}
>>>>>>> Stashed changes
                            variant="contained"
                            sx={{ width: '150%', mt: 3, mb: 2 }}
                        >
                            Create a Ladder
                        </Button>
<<<<<<< Updated upstream
=======
                        <Dialog component="form" open={open} onClose={() => { handleClose(); resetForm();}} onSubmit={handleSubmit}>
                            <DialogTitle variant="h4" align="center">Create a Team</DialogTitle>
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

                                {/* Add Member */}
                                <TextField
                                    value={member}
                                    onChange={(e) => addMember(e.target.value)}
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
                                {/* Member Array */}
                                <Button
                                    sx={{ width: "12%", marginTop: 2, float: "right", }}
                                    onClick={ addToTeam }>
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
>>>>>>> Stashed changes
                    </ButtonGroup>
                    )}
                    </>
                    
                )}

                <Typography component="h3">
                    Ladder
                </Typography>

                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    <List>
                        { window.localStorage.removeItem('tournament') }
                        { ladderTournaments.map((tournament, i) =>
                            <ListItem key={i}>
                                <ListItemText> {tournament.ladder_name} </ListItemText>
                                <ListItemText> {tournament.team_size} vs {tournament.team_size} </ListItemText>
                                <ListItemButton
                                    onClick={ () => window.localStorage.setItem('tournament', JSON.stringify(tournament)) }>
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