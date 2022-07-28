import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './ButtomBar.css'

function ButtomBar() {
    return (
        <div className='buttomBar'>
            <p className='buttomTitle'>
                Create your own Meetup group.
                {/* TBD */}
                <NavLink to="/createNewGroup">
                    <button>
                        Get Started
                    </button>
                </NavLink>
               
            </p>

            <div className='toolBarContiner flex'>
                <div className='tooBar'>
                    <p>
                        Your Account
                    </p>
           
                    <p>
                        <NavLink to="/signup" className='toobarLink'>
                            Sign up
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="/login" className='toobarLink'>
                            Log in
                        </NavLink>
                    </p>
                    <p>
                        <a href='https://help.meetup.com/hc/en-us' className='toobarLink'>
                            Help
                        </a>
                    </p>
                </div>
                <div className='tooBar'>
                    <p>
                        Discover
                    </p>

                    <p>
                        <NavLink to="/groups" className='toobarLink'>
                            Groups
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="/login" className='toobarLink'>
                            Events
                        </NavLink>
                    </p>
                </div>

                <div className='tooBar'>
                    <p>
                        WeMeet
                    </p>

                    <p>
                        <a href='https://www.meetup.com/about/' className='toobarLink'>
                            About
                        </a>
                    </p>
                    <p>
                        <a href='https://www.meetup.com/blog/' className='toobarLink'>
                            Blog
                        </a>
                    </p>
                    <p>
                        <a href='https://www.meetup.com/apps/' className='toobarLink'>
                            Apps
                        </a>
                    </p>
                </div>
            </div>


            <div className='followMe'>
                <p>
                    Follow me
                </p>
                <div className='followMe'>
                    <a href='https://www.facebook.com/profile.php?id=100012690077303' className='toobarLink'>
                        <i className="fa-brands fa-facebook fa-2x followMeIcon"></i>
                    </a>
                    <a href='https://www.instagram.com/hansen.guo/' className='toobarLink'>
                        <i className="fa-brands fa-instagram fa-2x followMeIcon"></i>
                    </a>

                    <a href='https://www.linkedin.com/in/hansen-guo/' className='toobarLink'>
                        <i className="fa-brands fa-linkedin fa-2x followMeIcon"></i>
                    </a>

                </div>
                
            </div>
            
        </div>
    ) 
};
export default ButtomBar;
