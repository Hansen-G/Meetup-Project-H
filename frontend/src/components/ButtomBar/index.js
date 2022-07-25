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
                <NavLink to="/signup">
                    <button>
                        Get Started
                    </button>
                </NavLink>
               
            </p>

            <div className='toolBarContiner'>
                <div className='tooBar'>
                    <p>
                        Your Account
                    </p>
           
                    <NavLink to="/signup" className='toobarLink'>
                        Sign up
                    </NavLink>
                    <NavLink to="/login" className='toobarLink'>
                        Log in
                    </NavLink>
                    <a href='https://help.meetup.com/hc/en-us' className='toobarLink'>
                        Help
                    </a>
                </div>
            </div>


            <div className='followMe'>
                <p>
                    Follow me
                </p>
                
            </div>
            
        </div>
    ) 
};
export default ButtomBar;
