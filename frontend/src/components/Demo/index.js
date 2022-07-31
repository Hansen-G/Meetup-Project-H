import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

function Demo () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return (
        <Redirect to="/" />
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        const credential = 'Demo-lition';
        const password = 'password'
    
        return dispatch(sessionActions.login({ credential, password })
        );
    }

    return(
        <form onSubmit={handleSubmit} className='demoForm'>
            <button type="submit" className="demo navButton">Demo</button>
        </form>
    )
}

export default Demo;