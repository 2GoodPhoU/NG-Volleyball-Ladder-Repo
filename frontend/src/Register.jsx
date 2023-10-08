import React, { useState } from "react";
import { Link } from "react-router-dom";

// we want useState, because we want to store the data the user inputs

export const Register = (props) => {
    // useState initally empty
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="login-register-page">
            <div className="auth-form">
                <h2>Create an Account</h2>

                <form
                    className="register-form"
                    onSubmit={handleSubmit}>

                    <label>Username</label>
                    <input value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        name="username"
                        id="username" />

                    <label htmlFor="password">Password</label>
                    <input value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="********"
                        type="password"
                        id="password"
                        name="password" />

                    <label>Full Name</label>
                    <input value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        name="name"
                        id="name" />

                    <label htmlFor="email">Email</label>
                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        type="email"
                        id="email"
                        name="email" />

                    
                    <Link to="/" className="link">
                        <button>Register</button>
                    </Link>
                   
                </form>
                
            </div>
        </div>
    )
}