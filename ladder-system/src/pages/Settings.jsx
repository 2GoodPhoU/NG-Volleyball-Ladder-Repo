import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CssBaseline, TextField, Grid, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListSubheader, ListItemButton }from '@mui/material';
import ng_1 from "../images/ng_1.png";

export function Settings() {
    const [newUsername, setNewUsername] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // onSubmit display in console
    const handleSubmitChange = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log('Form submitted');
        
        console.log({
            newUsername: data.get("newUsername"),
            newPassword: data.get("newPassword"),
            newName: data.get("newName"),
            enewEmailmail: data.get("newEmail"),
        });
        
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItem: 'center'
                }}>
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
                    
                {/* Top */}
                <Typography component="h1" align="center" variant="h3">
                    Settings
                </Typography>

                {/* Switch */}
                <Box noValidate align="center" sx={{ mt: 3}}>
                    <ButtonGroup size="medium">
                        <Button>General</Button>
                        <Button>Notificaiton</Button>
                    </ButtonGroup>
                </Box>

                {/* Form */}
                <Box component="form" noValidate onSubmit={handleSubmitChange} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {/*General Settings */}
                        <Grid  item xs={12}>
                            <Typography component="h1" align="center" variant="h5">
                                General
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                    value={newUsername}
                                    
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    required
                                    fullWidth
                                />
                                {/* onChange={(e) => setNewUsername(e.target.value)*/}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                    value={newFirstName}
                                    
                                    autoComplete="given-name"
                                    name="firstName"
                                    id="firstName"
                                    label="First Name"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                                {/* onChange={(e) => setNewFirstName(e.target.value)*/}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                    value={newLastName}
                                    
                                    autoComplete="family-name"
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    required
                                    fullWidth
                                />
                                {/* onChange={(e) => setNewLastName(e.target.value)*/}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={newEmail}
                                
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                required
                                fullWidth
                            />
                            {/*onChange={(e) => setNewEmail(e.target.value)} */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={newPassword}
                                
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                required
                                fullWidth
                            />
                            {/*onChange={(e) => setNewPassword(e.target.value)} */}
                        </Grid>
                    </Grid>
                    
                </Box>
                
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    {/* Notification Settings */}
                <Grid item xs={12}>
                    <Typography component="h1" align="center" variant="h5">
                        Notificaiton
                    </Typography>
                </Grid>
                    {/* Will update this later */}
                <input type="checkbox"/>
                <label htmlFor="results" className="note-label">
                    Results</label>
                    <input type="checkbox" />               
                <label htmlFor="Challenges" className="note-label">
                    Challenges</label>
                    <input type="checkbox" />
                <label htmlFor="message" className="note-label"> Messages</label>
                </Box>
                <Box  sx={{ mt: 3 }}> 
                    <Grid container justifyContent="flex" flexDirection='column' alignItems="center">
                        <Grid item>
                            <Link href="/Dashboard" color="Black" variant="body2">
                                <Button>Back</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


        </Container>
    )
}
