import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup";

import './App.css';

import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://wrelwyuqbbtagdszesuh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZWx3eXVxYmJ0YWdkc3plc3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNTI0MzYsImV4cCI6MjAxMjkyODQzNn0.A16btjC6Ukht9JYSwn3bsmPNl3xsysv-9hjUJR7QR2g");


// we want useState, because we want to store the data the user inputs

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
        const { error } = await supabase
        .from('users')
        .insert({ email: e, password: pw, username: un, first_name: n });

        console.log(`Was there an error? ${error}`);
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
        insertUser(data.get('email'), data.get('password'), data.get('username'), data.get('name'));
    }

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

                    {/* Popup */}
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