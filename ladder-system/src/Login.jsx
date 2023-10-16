import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './App.css';

import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://wrelwyuqbbtagdszesuh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZWx3eXVxYmJ0YWdkc3plc3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNTI0MzYsImV4cCI6MjAxMjkyODQzNn0.A16btjC6Ukht9JYSwn3bsmPNl3xsysv-9hjUJR7QR2g");

/*
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT null,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password) VALUES ('thomaslenguyenasian@gmail.com', 'nicejob');
*/

export const Login = (props) => {
    // useState initally empty
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const { data } = await supabase.from("users").select();
        setUsers(data);
    }


    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(pass);

        console.log("are we in?");

        for (var i = 0; i < users.length; i++)
            if (users[i].email === username)
                break;

        if (i >= users.length && users[i - 1].email !== username) {
            console.log("email invalid, create an account!")
            return;
        }

        if (users[i].password === pass)
            console.log("logged in successfully");
        else
            console.log("not logged in");
    }

    return (
        <div className="login-register-page">

            <div className="auth-form">
                <p>TO LOG IN USE UN: thomaslenguyenasian@gmail.com and PW: nicejob</p>
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

                    <Link to="/Dashboard" className="link">
                        <button onClick={handleSubmit}>Login</button>
                    </Link>
                </form>

                <Link to="/Register" className="link"> Create Account </Link>
                <Link to="/Dashboard" className="link"> Continue as Guest </Link>
                <div className="link"> Information </div>

                </div>
        </div>
    )
}