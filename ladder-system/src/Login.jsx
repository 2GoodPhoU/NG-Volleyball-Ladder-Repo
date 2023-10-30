import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import MailIcon from '@mui/icons-material/Mail';

import './App.css';


/*
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT null,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password) VALUES ('thomaslenguyenasian@gmail.com', 'nicejob');
*/

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
                <div className="link"> Information </div>

                <button className="link">
                 <MailIcon/>
                </button>


                </div>
        </div>
    )
}