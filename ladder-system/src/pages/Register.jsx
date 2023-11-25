import React, { useState } from "react";
import { supabase } from "../supabaseClient";

import { CssBaseline, TextField, Link, Grid, Box, Container, Typography,  Button } from '@mui/material';

import ng_1 from "../images/ng_1.png";

import { useNavigate } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export const Register = () => {
    const navigate = useNavigate();

    // useState initally empty
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [terms, setTerms] = useState(false);

    // Dialog States (Terms and Conditions)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Check if Form is Filled
	const formValid = firstName !== "" && lastName !== "" 
        && email !== "" && username !== "" && password !== ""
        && terms !== false;


    async function insertUser(e, pw, un, fn, ln) {
        const { error } = await supabase
            .from('users')
            .insert({ email: e, password: pw, username: un, first_name: fn, last_name: ln });

        return true;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            username: data.get("username"),
            password: data.get("password"),
            first_name: data.get("firstName"),
            last_name: data.get("lastName"),
            email: data.get("email"),
        });

        const unExists = await usernameExists(data.get('username'));
        if (!unExists) {
            insertUser(data.get('email'), data.get('password'), data.get('username'), data.get('firstName'), data.get('lastName'));
            navigate('/');
        }
    }

    async function usernameExists(un) {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('username', un)

        return (data.length === 1) ? true : false;
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
                {/* NG Logo */}
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
                    Account Information
                </Typography>

                {/* Form */}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>

                        {/* First Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                autoComplete="given-name"
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>

                        {/* Last Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                autoComplete="family-name"
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                required
                                fullWidth
                            />
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                required
                                fullWidth
                            />
                        </Grid>

                        {/* Username */}
                        <Grid item xs={12}>
                            <TextField
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                required
                                fullWidth
                            />
                        </Grid>

                        {/* Password */}
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                onChange={(e) => setPass(e.target.value)}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    {/* Terms & Conditions */}

                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        padding={2}
                    >
                        <Grid Grid item >
                            <Link
                                underline="hover"
                                onClick={handleClickOpen}
                                style={{ cursor: 'grab' }}
                                sx={{ mt: 1, mb: 2 , color: "#000000"}}>
                                Terms and Conditions
                            </Link>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                sx = {{ position: 'absolute', bottom: '20%'}}>
                                <DialogTitle align="center"> Terms and Conditions </DialogTitle>
                                <DialogContent>
                                    <DialogContentText align="center">
                                        *insert terms and conditions*
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={ () => {handleClose(); setTerms(true);}}>Accept</Button>
                                    <Button onClick={ () => {handleClose(); setTerms(false);}}>Decline</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>


                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!formValid}
                        sx={{ mb: 2 }}
                        fullWidth
                    >
                        Sign Up
                    </Button>


                    <Grid container justifyContent="flex" flexDirection='column' alignItems="center">
                        <Grid item>
                            <Link href="\" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Container>
    )
}
