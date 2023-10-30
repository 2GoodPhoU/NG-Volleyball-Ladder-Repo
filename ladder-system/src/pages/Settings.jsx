import React, { useState } from "react";
import { Link } from "react-router-dom";


export function Settings() {
    const [newUsername, setNewUsername] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // onSubmit display in console
    const handleSubmitChange = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log('Form submitted');
        
        console.log({
            newUsername: data.get("newUsername"),
            newPassword: data.get("newPassword"),
            newName: data.get("newName"),
            enewEmailmail: data.get("newEmail"),
        });
        
    }

    return (
        <div className="settings-page">
            <div className="page-form">
            <h1>Settings</h1>
            <h3>General</h3>
                <form className="settings-form"
                onSubmit={handleSubmitChange}>

                    <label>Username</label>
                    <input value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Username"
                        name="username"
                        id="username"/>

                    <label>Name</label>
                    <input value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Full Name"
                        name="name"
                        id="name"/>
                    <label>Email</label>
                    <input value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="example@email.com"
                        type="email"
                        id="email"
                        name="email"
                        required />
                    <label>Password</label>
                    <input value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="********"
                        type="password"
                        id="password"
                        name="password"/>



            <h3>Notifications</h3>
            
            <div className="note-form">
                <input type="checkbox"/>
                <label htmlFor="results" className="note-label">
                    Results</label>
            </div>

            <div className="note-form">
                <input type="checkbox" />               
                <label htmlFor="Challenges" className="note-label">
                    Challenges</label>
            </div>
            <div className="note-form">
                <input type="checkbox" />
                <label htmlFor="message" className="note-label"> Messages</label>
            </div>
            <button type="submit" className="note-button">Save</button>
            </form>

            </div>
            <Link to="/Dashboard">
                <button className="dash_lnk">Back</button>
            </Link>
        </div>
    )
}
