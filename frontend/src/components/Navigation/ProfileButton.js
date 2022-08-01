import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {    
        e.preventDefault();
        dispatch(sessionActions.logout()).then(
            ()=>{
                history.push(`/`)
            }
        );
    };
    
    console.log(user, user.lastName)
    return (
        <> 
            <div className="profileButtonDiv">
                <button className="profileButton" onClick={openMenu}>
                    <i className="fas fa-user-circle userIcon" />
                </button>
            </div>
            
            {showMenu && (
            <div className="menuDiv">
              <div className="dropdownBox">
                <div className="usernameDiv">
                    Welcome {user.lastName}!
                </div>
                <div className="usernameDiv">
                  Username: {user.username}
                </div>
                <div className="emailDiv">
                  Email: {user.email}
                </div>
                <div className="linkDiv">
                            <Link to='/createNewGroup' id="menuLink">Create your group</Link>
                </div>
                <div className="linkDiv">
                            <Link to='/groups' id="menuLink">Find new groups</Link>
                </div>
                <div className="linkDiv" id='linkDiv'>
                            <Link to='/events' id="menuLink">Find new events</Link>
                </div>
                <div className="logoutDiv" onClick={logout}>Log Out</div>
              </div>
            </div>
            )}
        </>
    );
}

export default ProfileButton;