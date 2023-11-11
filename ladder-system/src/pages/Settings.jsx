import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CssBaseline, TextField, Grid, Box, Typography, 
    Container, Button, ButtonGroup, Checkbox, FormGroup, 
    FormControlLabel }from '@mui/material';
import ng_1 from "../images/ng_1.png";

export function Settings() {
    // User settings
    const [newUsername, setNewUsername] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Functionality
    const [modeLabel, setModeLabel] = useState("Profile");
    const [notifyMode, setNotifyMode] = useState(false); // Used to change to Profile or Notification states
    const [checkedResults, setCheckedResults] = useState(true);
    const [checkboxes, setCheckboxes] = useState({
        checkedResults: true,
        checkedChallenge: true,
        checkedMessages: true

        //Add more checkboxes
    });
    

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

    const handleNoteChange = (event) => {

        const mode = event.target.name;
        //switch to Notificaiton
        setModeLabel(mode)
        setNotifyMode(mode === "Notification");
    }

    const handledAccessChange = (name) => (event) => {
        console.log(name, event.target.checked);
        setCheckboxes({...checkboxes, [name]: event.target.checked})
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
                    alt="NG logo"
                />
                    
                {/* Top */}
                <Typography component="h1" align="center" variant="h3">
                    Settings
                </Typography>

                {/* Switch */}
                <Box noValidate align="center" sx={{ mt: 3}}>
                    <ButtonGroup size="large" fullWidth>
                    <Button
                            name="Profile"
                            type="button"


                            onClick={handleNoteChange}
                        >
                        Profile
                    </Button>

                    <Button
                            name="Notification"
                            type="button"


                            onClick={handleNoteChange}
                    >Notificaiton
                    </Button>
                    <Button
                            name="Accessibility"
                            type="button"


                            onClick={handleNoteChange}
                    >Accessibility
                    </Button>
                    </ButtonGroup>
                </Box>
                <Box> 
                    <Grid container justifyContent="flex" flexDirection='column' alignItems="center">
                        <Grid item>
                            <Typography component="h1" align="center" variant="h6">
                                {modeLabel}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                {/* Form */}
                <Box component="form" noValidate onSubmit={handleSubmitChange} sx={{ mt: 1 }}>

                {notifyMode ? (<>
                          
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Results" />
                        <FormControlLabel control={<Checkbox />} label="Challenge" />
                        <FormControlLabel control={<Checkbox />} label="Messages" />
                    </FormGroup>
                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mb: 2, mt: 5 }}
                        fullWidth
                        >
                        Save Notification Setting
                    </Button>

                </>
                
                
                
                ) : (<>


                    <Grid container spacing={2}>
                        {/*Profile Settings */}

                        <Grid item xs={12}>
                            <TextField
                                    
                                    
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    required
                                    fullWidth
                                />
                                {/* value={newUsername} */}
                                {/* onChange={(e) => setNewUsername(e.target.value)*/}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                    
                                    
                                    autoComplete="given-name"
                                    name="firstName"
                                    id="firstName"
                                    label="First Name"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                                {/* value={newFirstName} */}
                                {/* onChange={(e) => setNewFirstName(e.target.value)*/}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                    
                                    
                                    autoComplete="family-name"
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    required
                                    fullWidth
                                />
                                {/* value={newLastName} */}
                                {/* onChange={(e) => setNewLastName(e.target.value)*/}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                
                                
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                required
                                fullWidth
                            />
                            {/* value={newEmail} */}
                            {/*onChange={(e) => setNewEmail(e.target.value)} */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                
                                
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                required
                                fullWidth
                            />
                            {/* value={newPassword} */}
                            {/*onChange={(e) => setNewPassword(e.target.value)} */}
                        </Grid>
                    </Grid>
                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mb: 2, mt: 5 }}
                        fullWidth
                        >
                        Save Changes
                    </Button>
                    </>
                    ) }
                    
                </Box>
                {/*
                <Box component="form" noValidate onSubmit={handleSubmitChange} sx={{ mt: 1 }}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Results" />
                        <FormControlLabel control={<Checkbox />} label="Challenge" />
                        <FormControlLabel control={<Checkbox />} label="Messages" />
                    </FormGroup>
                </Box>
                */}



                {/* Back Button */}
                <Box  sx={{ mt: 3 }}> 
                    <Grid container justifyContent="flex" flexDirection='column' alignItems="center">
                        <Grid item>
                            <Link to="/Dashboard" color="Black" variant="body2">
                                <Button>Back</Button>
                            </Link>
                            <Link to="/UserManager" color="Black" variant="body2">
                                <Button>User Manager</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


        </Container>
    )

}





{/*
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} >
                        <Typography>Results</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Checkbox 
                            checked = {checkboxes.checkedResults}
                            onChange= {handledCheckChange("Results")}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} >
                        <Typography>Challenges</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Checkbox 
                            checked = {checkboxes.checkedChallenge}
                            onChange= {handledCheckChange("Challenge")}
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} >
                        <Typography>Messages</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Checkbox 
                            checked = {checkboxes.checkedMessages}
                            onChange= {handledCheckChange("Messages")}
                        />
                    </Grid>

                </Grid>
                */}