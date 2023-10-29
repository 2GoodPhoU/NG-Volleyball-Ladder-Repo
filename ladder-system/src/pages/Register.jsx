import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

import Popup from "../components/Popup";

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