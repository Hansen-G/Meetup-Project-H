import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './ButtomBar.css'

function ButtomBar() {
    return (
        <div className='buttomBarContiner' >
            <div className='buttomBar'>
                <p className='buttomTitle'>
                    Create your own Meetup group.
                    {/* TBD */}
                    <NavLink to="/createNewGroup">
                        <button className='barButton'>
                            Get Started
                        </button>
                    </NavLink>

                </p>

                <div className='toolBarContiner flex'>
                    <div className='tooBar'>
                        <p className='barTitle'>
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
                        <p className='barTitle'>
                            Discover
                        </p>

                        <p>
                            <NavLink to="/groups" className='toobarLink'>
                                Groups
                            </NavLink>
                        </p>
                        <p>
                            <NavLink to="/events" className='toobarLink'>
                                Events
                            </NavLink>
                        </p>
                    </div>

                    <div className='tooBar'>
                        <p className='barTitle'>
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

                <div className='bar3 flex'>


                    <div className='followMe'>
                        <p className='barTitle'>
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
                            
                            <a href='https://github.com/Hansen-G' className='toobarLink'>
                                <i className="fa-brands fa-github fa-2x followMeIcon"></i>
                            </a>

                        </div>

                    </div>

                    <div className='download'>
                        <a target="_blank" href='https://apps.apple.com/us/app/meetup/id375990038'>
                            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658780015/WeMeet/download_en-US_wqm4tx.svg'></img>
                        </a>
                        <a target="_blank" href='https://play.google.com/store/apps/details?id=com.meetup&hl=en-US'>
                            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658780015/WeMeet/download_en-US_1_ggkmvj.svg'></img>
                        </a>

                    </div>
                </div>

            </div>

        </div>
    
    ) 
};
export default ButtomBar;
