import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

import { CssBaseline, TextField, Checkbox, Link, Grid, Box, Container, Typography, FormControlLabel, Button } from '@mui/material';

import Popup from "../components/Popup";
import ng_1 from "../images/ng_1.png";


export const Register = () => {
    // useState initally empty
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');

    // Popup State
    const [isPopupOpen, togglePopup] = useState(false);

    // add password requirements
    // check if username is already in use

    async function insertUser(e, pw, un, n) {
        // const unExists = usernameExists(un)

        // if (unExists) {
        //     console.log(`did not add user ${un}`);
        //     return false;
        // }

        const { error } = await supabase
            .from('users')
            .insert({ email: e, password: pw, username: un, first_name: n });

        console.log(`added user ${un}`);

        return true;
    }

    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            username: data.get("username"),
            password: data.get("password"),
            name: data.get("name"),
            email: data.get("email"),
        });

        // API call here
        // const unExists = usernameExists(data.get('username'));
        // if (!unExists)
        var iUN = insertUser(data.get('email'), data.get('password'), data.get('username'), data.get('name'));

        // if (iUN) console.log('inserted');
        // else console.log('nothing happened');
    }

    // async function usernameExists(un) {
    //     const { data, error } = await supabase
    //     .from('users')
    //     .select()
    //     .eq('username', un)

    //     console.log(`this is what is inside of data===\n${JSON.stringify(data, null, 2)}`);
    //     console.log(`this is what is inside of error===\n${JSON.stringify(error, null, 2)}`);
    //     // THIS IS GARGAGE FIGURE THIS OUT ASAP BRUH MOMENT
    //     console.log(`the length of the data is: ${data.length}`);

    //     if (data.length === 1)
    //         console.log("username exists");
    //     else
    //         console.log("username does not exist");

    //     return (data.length === 1) ? true : false;
    // }


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
                        spacing={1}
                    >
                        <Grid Grid item >
                            <div onClick={() => togglePopup(true)}> Terms & Conditions </div>
                            {isPopupOpen ? <Popup
                                title="Terms & Conditions"
                                text="*insert terms here*"
                                closePopup={() => togglePopup(false)} /> : null}

                        </Grid>
                        <Grid Grid item >
                            <FormControlLabel
                                control={<Checkbox />}
                                required
                            />
                        </Grid>
                    </Grid>



                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
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


/*
export const Register = (props) => {
    // useState initally empty
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Popup State
    const [isPopupOpen, togglePopup] = useState(false);
    
    // add password requirements
    // check if username is already in use

    async function insertUser(e, pw, un, n) {
        // const unExists = usernameExists(un)

        // if (unExists) {
        //     console.log(`did not add user ${un}`);
        //     return false;
        // }

        const { error } = await supabase
        .from('users')
        .insert({ email: e, password: pw, username: un, first_name: n });

        console.log(`added user ${un}`);

        return true;
    }

    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            username: data.get("username"),
            password: data.get("password"),
            name: data.get("name"),
            email: data.get("email"),
        });

        // API call here
        // const unExists = usernameExists(data.get('username'));
        // if (!unExists)
            var iUN = insertUser(data.get('email'), data.get('password'), data.get('username'), data.get('name'));

        // if (iUN) console.log('inserted');
        // else console.log('nothing happened');
    }

    // async function usernameExists(un) {
    //     const { data, error } = await supabase
    //     .from('users')
    //     .select()
    //     .eq('username', un)

    //     console.log(`this is what is inside of data===\n${JSON.stringify(data, null, 2)}`);
    //     console.log(`this is what is inside of error===\n${JSON.stringify(error, null, 2)}`);
    //     // THIS IS GARGAGE FIGURE THIS OUT ASAP BRUH MOMENT
    //     console.log(`the length of the data is: ${data.length}`);

    //     if (data.length === 1)
    //         console.log("username exists");
    //     else
    //         console.log("username does not exist");

    //     return (data.length === 1) ? true : false;
    // }

    return (
        <div className="login-register-page">
            <div className="auth-form">
                <h2>Create Account</h2>

                <form
                    className="register-form"
                    onSubmit={handleSubmit}>

                    <label>Username</label>
                    <input value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        name="username"
                        id="username"
                        required />

                    <label htmlFor="password">Password</label>
                    <input value={password}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="********"
                        type="password"
                        id="password"
                        name="password"
                        required />

                    <label>Full Name</label>
                    <input value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        name="name"
                        id="name"
                        required />

                    <label htmlFor="email">Email</label>
                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        type="email"
                        id="email"
                        name="email"
                        required />

                    
                    <div className="link" onClick={() => togglePopup(true)}> Terms & Conditions </div>
                    {isPopupOpen ? <Popup
                                    title="Terms & Conditions" 
                                    text="*insert terms here*"
                                    closePopup={() => togglePopup(false)} /> : null}


                    <button type="submit">Register</button>

                </form>


                <Link to="/" className="link">
                    <div type="submit">Already Have an Account</div>
                </Link>

            </div>
        </div>
    )
}
*/