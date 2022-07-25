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
                <Demo />
                <LoginFormModal />
                <SignupFormModal />
            </div>
        );
    }

    return (
 
            <div className='nav'>
                <div>
                    <NavLink exact to="/">
                        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658764084/WeMeet/logo_xdfq3d.png'></img>
                    </NavLink>
                </div>
                
                <div className='navuser'>
                    {isLoaded && sessionLinks}
                </div>
                
            </div>
               
  
    );
}

export default Navigation;