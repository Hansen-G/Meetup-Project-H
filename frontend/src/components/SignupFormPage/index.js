// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import './SignupForm.css';

function SignupFormPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        window.alert('You already a WeMeet user. If you want to sign up a new account, please log out first.');
        
        return <Redirect to="/" />
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(() => {
                    window.alert('Sign up successfully and welcome to WeMeet! Now you can view a variety of events and join in or create new groups!');
                    history.push(`/`)
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className='loginForm flex' id="signUpForm">
            <img src="https://res.cloudinary.com/hansenguo/image/upload/v1658770529/WeMeet/logo-round_yxfzs4.png" className="roundLogo"></img>
            <h1 className="title">
                Finish signing up
            </h1>
            <p>
                Already a member? <Link to='/login'>Log in</Link>
            </p>
            <form onSubmit={handleSubmit} className='signUpForm'>


                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>


                <label>
                    Your email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Your username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Your First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Your Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="signUpButton">Sign Up</button>
            </form>

        </div>
    );
}

export default SignupFormPage;