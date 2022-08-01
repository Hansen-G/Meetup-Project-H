import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState(`Search for "tennis"`);

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/events`);
    };

    return (
        <main className='home1'>
            <div className='bg2 flex'>
                <img src='https://secure.meetupstatic.com/next/images/blobs/green-blob.svg' id='bg1'></img>
                <img src='https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg' id='bg2'></img>
                <img src='https://secure.meetupstatic.com/next/images/blobs/red-blob.svg' id='bg3'></img>
            </div>
            <div className='part1 flex'>
                <div className='part1Left'>
                    <h1>
                        Celebrating 0 years of real connections on WeMeet
                    </h1>
                    <p>
                        Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.
                    </p>
                </div>
                <div className='part1Right'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658772139/WeMeet/online_events_oogsxa.svg'></img>
                </div>
            </div>

            <div className='part2 flex'>
                <div className='part2Card'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658772522/WeMeet/category1_bjhr11.webp'></img>

                    {/* TOBEDONE */}
                    <NavLink exact to="/events" className='part2CardLink'>
                        Make new friends →
                    </NavLink>

                </div>

                <div className='part2Card'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658772522/WeMeet/category2_xd8uzp.webp'></img>

                    {/* TOBEDONE */}
                    <NavLink exact to="/events" className='part2CardLink'>
                        Explore the outdoors →
                    </NavLink>

                </div>

                <div className='part2Card'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658772522/WeMeet/category3_c412cr.webp'></img>

                    {/* TOBEDONE */}
                    <NavLink exact to="/groups" className='part2CardLink'>
                        Connect over tech →
                    </NavLink>

                </div>
            </div>

            {/* <div className='part3'>
                <div className='part3Left'>
                    <h2>
                        What do you want to do?
                    </h2>
                    <div className='search'>
                        <form onSubmit={handleSubmit}>
                            <div className='searchBar flex'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <div className='inputContiner'>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder={search}
                                            className='input'
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>


                            <button type="submit" className='searchmain'>Search</button>
                        </form>
                    </div>

                </div>
            </div> */}

            <div className='part4'>
                <h2 className='centerText'>
                    How WeMeet works
                </h2>
                <p className='centerText'>
                    Meet new people who share your interests through online and in-person events. It’s free to create an account.
                </p>

                <div className='part4subContiner flex'>
                    <div className='part4sub centerText'>
                        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658778861/WeMeet/handsUp_nwbipy.svg'></img>
                        <h3>
                            <NavLink exact to="/groups">
                                Join a group
                            </NavLink>
                        </h3>
                        <p className='part4P'>
                            Do what you love, meet others who love it, find your community. The rest is history!
                        </p>
                    </div>
                    <div className='part4sub centerText'>
                        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658778861/WeMeet/ticket_ibghag.svg'></img>
                        <h3>
                            <NavLink exact to="/events">
                                Find an event
                            </NavLink>
                        </h3>
                        <p className='part4P'>
                            Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.
                        </p>
                    </div>
                    <div className='part4sub centerText'>
                        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1658778861/WeMeet/joinGroup_xp0nfa.svg'></img>
                        <h3>
                            <NavLink exact to="/createNewGroup">
                                Start a group
                            </NavLink>
                        </h3>
                        <p className='part4P'>
                            You don't have to be an expert to gather people together and explore shared interests.
                        </p>
                    </div>

                </div>

            </div>

            <div className='part5 centerText'>
                <Link exact to="/signup">
                    <button className='joinMain'>Join WeMeet</button>
                </Link>
            </div>

        </main>
    );
}

export default HomePage;