import { useState, useEffect } from "react";
//import { Link, useNavigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import { CssBaseline, TextField, Grid, Box, Typography, Container, Button, Link }from '@mui/material';

import ng_1 from "../images/ng_1.png";

/*
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT null,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password) VALUES ('thomaslenguyenasian@gmail.com', 'nicejob');
*/

function Copyright(props) {
    return (
        <Typography variant="body2" align="center" {...props}>
            {'Copyright © '}
            <Link href="https://www.northropgrumman.com/" style={{ color: "black", textDecoration: 'none' }} >
                Northrop Grumman
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

let loggedIn = false;

export const Login = () => {   

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const { data } = await supabase
        .from('users')
        .select();
        
        setUsers(data);

    }

    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(pass);

        for (var i = 0; i < users.length; i++)
            if (users[i].username === username)
                break;

        if (i >= users.length && users[i - 1].username !== username) {
            console.log("username invalid, create an account!")
            console.log(`loggedIn before = ${loggedIn}`);
            loggedIn = false;
            console.log(`loggedIn after = ${loggedIn}`);
            return;
        }

        if (users[i].password === pass) {
            console.log("logged in successfully");
            console.log(`loggedIn before = ${loggedIn}`);
            loggedIn = true;
            console.log(`loggedIn after = ${loggedIn}`);
            navigate("./Dashboard");
        } else {
            console.log("not logged in");
            console.log(`loggedIn before = ${loggedIn}`);
            loggedIn = false;
            console.log(`loggedIn after = ${loggedIn}`);
        }
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
                    src= {ng_1} 
                    alt="Northrop Grumman logo"
                />
                <Typography component="h1" variant="h5">
                    Volleyball Ladder System
                </Typography>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {/* Username */}
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        id="username"
                        name="username"
                        autoComplete="username"
                        margin="normal"
                        autoFocus
                        required
                        fullWidth
                    />

                    {/* Password */}
                    <TextField
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        label="Password"
                        name="password"
                        type="password"
                        id="password"
                        margin="normal"
                        autoComplete="current-password"
                        required
                        fullWidth
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link  
                                href="/Register"
                                variant="body2">
                                    
                                {"Create Account"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/Dashboard" variant="body2">
                                {"Login as Guest"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 3, mb: 4, }} />
        </Container>
    );
}


/* Check if this still works w/Database,           |
    if so, delete all the commented out code below V */  

/*

let loggedIn = false;

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const { data } = await supabase
        .from('users')
        .select();
        
        setUsers(data);

    }

    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(pass);

        for (var i = 0; i < users.length; i++)
            if (users[i].username === username)
                break;

        if (i >= users.length && users[i - 1].username !== username) {
            console.log("username invalid, create an account!")
            console.log(`loggedIn before = ${loggedIn}`);
            loggedIn = false;
            console.log(`loggedIn after = ${loggedIn}`);
            return;
        }

        if (users[i].password === pass) {
            console.log("logged in successfully");
            console.log(`loggedIn before = ${loggedIn}`);
            loggedIn = true;
            console.log(`loggedIn after = ${loggedIn}`);
            navigate("./Dashboard");
        } else {
            console.log("not logged in");
            console.log(`loggedIn before = ${loggedIn}`);
            loggedIn = false;
            console.log(`loggedIn after = ${loggedIn}`);
        }
    }

    return (
        <div className="login-register-page">

            <div className="auth-form">
                <p>TO LOG IN USE UN: admin1 and PW: passwordadmin1</p>
                <h2>Volleyball Ladder System</h2>

                <form className="login-form">
                    <label form="username">Username</label>
                    <input value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="username"
                        placeholder="Enter your username"
                        id="username"
                        name="username" />

                    <label form="password">Password</label>
                    <input value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="********"
                        id="password"
                        name="password" />

                    <button onClick={handleSubmit}>Login</button>
                </form>

                <Link to="/Register" className="link"> Create Account </Link>
                <Link to="/Dashboard" className="link"> Continue as Guest </Link>


                </div>
        </div>
    )
}
*/