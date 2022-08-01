import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { NavLink, useParams, Route, Switch, Link } from 'react-router-dom';
import './LoginForm.css';

function LoginForm( {setModal}) {

    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
      
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <div className='loginForm flex'>
                <img src="https://res.cloudinary.com/hansenguo/image/upload/v1658770529/WeMeet/logo-round_yxfzs4.png" className="roundLogo"></img>
                <h1 className="title">
                    Log in
                </h1>
                <p>
                    Not a member yet? <Link to='/signup' onClick={() => setModal(false)}>Sign up</Link>
                </p>

            
            <form  onSubmit={handleSubmit}>
 
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="signUpButton" >Log In</button>
            </form>
        </div>
        
    );
}

export default LoginForm;