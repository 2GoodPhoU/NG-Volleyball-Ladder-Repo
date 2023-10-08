import React, { useState } from "react";
import { Link } from "react-router-dom";

import './App.css';

// add popup alert (when user successfully creates an account)
// add popup for information?

export const Login = (props) => {
    // useState initally empty
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(pass);
    }

    return (
        <div className="login-register-page">
            <div className="auth-form">
                <h2>Volleyball Ladder System</h2>

                <form className="login-form"
                    onSubmit={handleSubmit}>
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
                        <button>Login</button>
                    </Link>
                </form>

                <Link to="/Register" className="link"> Create Account </Link>
                <Link to="/Dashboard" className="link"> Continue as Guest </Link>
                <div className="link"> Information </div>

                </div>
        </div>
    )
}