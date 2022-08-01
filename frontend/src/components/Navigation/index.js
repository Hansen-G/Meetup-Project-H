import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import Demo from '../Demo';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className='sessionLinks'>         
                <LoginFormModal />
                <SignupFormModal />
                <Demo />
            </div>
        );
    }

    return (
 
            <div className='nav'>
                <div>
                    <NavLink exact to="/" id='logo'>
                        WeMeet
                    </NavLink>
                </div>
                
                <div className='navuser'>
                    {isLoaded && sessionLinks}
                </div>
                
            </div>
               
  
    );
}

export default Navigation;