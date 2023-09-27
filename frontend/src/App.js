import React, {useState } from "react";

import logo from './logo.svg';
import './App.css';

import { Login } from "./Login";
import { Register } from "./Register";


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  // setting Form Name using Form Hook
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <div className="login-register-page">
      { 
      // Toggle Login / Register Page
      // CHANGE LATER to Routing Instead
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
      </div>
    </div>
  );
}

export default App;
