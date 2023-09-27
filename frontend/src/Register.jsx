import React, { useState } from "react";

// we want useState, because we want to store the data the user inputs

export const Register = (props) => {
    // useState initally empty
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    // onSubmit display in console
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form">
            <h2>Create an Account</h2>

            <form
                className="register-form"
                onSubmit={handleSubmit}>

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

                <label htmlFor="password">Password</label>
                <input value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="********"
                    type="password"
                    id="password"
                    name="password" />

                <button>Register</button>
            </form>
            <button className="link-btn"
                     onClick={() => props.onFormSwitch("login")}>Already have an account? Login here.</button>
        </div>
    )
}