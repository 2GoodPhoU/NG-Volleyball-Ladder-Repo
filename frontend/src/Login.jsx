import React, { useState } from "react";
import './App.css';

export const Login = (props) => {
    // useState initally empty
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }

    return (
        <div className="auth-form">
            <h2>Login</h2>

            <form className="login-form"
                onSubmit={handleSubmit}>
                <label form="email">Email</label>
                <input value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@email.com"
                    id="email"
                    name="email" />

                <label form="password">Password</label>
                <input value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password" />

                <button>Login</button>
            </form>

            <button className="link-btn"
                    onClick={() => props.onFormSwitch("register")}>Dont have an account? Register here.</button>
        </div>
    )
}