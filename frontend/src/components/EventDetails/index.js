import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { getEventByIdThunk } from '../../store/events'

function EventDetails() { 

    const dispatch = useDispatch();
    const history = useHistory();
    const { eventId } = useParams();

    const event = useSelector(
        state => state.events[eventId]
    )

    const user = useSelector(state => state.session.user);

    const helper = async (eventId) => {
        const eventWait = await dispatch(getEventByIdThunk(eventId));
    }

    useEffect(() => {
        helper(eventId)
    }, [dispatch]);

    if(!event) return null;

    console.log(event)

    let state;
    if (event.Group.private === true) {
        state = 'Private Group'
        return (
            <div className='event'>
                <div className='event1'>
                    <p>
                        {event.startDate}
                    </p>
                    <h1>
                        {event.name}
                    </h1>
                    <p>
                        Hosted by <Link to={`/groups/${event.Group.id}`}>{event.Group.name}</Link>
                    </p>
                    <p>
                        {state}
                    </p>

                </div>

                <div className='event2'>
                    <div className='event2Left'>


                    </div>

                </div>
            </div>
        )
    } else {
        state = 'Public Group'

        return (
            <div className='event'>
                <div className='event1'>
                    <p>
                        {event.startDate}
                    </p>
                    <h1>
                        {event.name}
                    </h1>
                    <p>
                        Hosted by <Link to={`/groups/${event.Group.id}`}>{event.Group.name}</Link>
                    </p>
                    <p>
                        {state}
                    </p>

                </div>

                <div className='event2 flex'>
                    <div className='event2Left'>
                        
                        <div className='eventDetails'>
                            <h3>
                                Details
                            </h3>
                            <p>
                                {event.description}
                            </p>
                        </div>

                        <div className='eventAttendees'>
                            <h3>
                                Attendees
                            </h3>
                            <p>
                               TBD
                            </p>
                        </div>

                        <div className='eventGroupCard flex'>
                            <div>
                                <Link to={`/events/groups/${event.Group.id}`}>
                                    <div className='eventGroupCardLeft'>
                                        <p>
                                            {event.Group.name}
                                        </p>

                                        <p>
                                            See more events
                                        </p>

                                    </div>

                                   
                                </Link> 
                            </div>
                            <div className='eventGroupCardRight'>
                                <Link to={`/events/groups/${event.Group.id}`}>
                                    {`>`}
                                </Link> 
                            </div>
         
                        </div>
                    </div>
                    <div className='event2Right'>
                        <Link>
                            <div className='eventGroupCard2 flex'>                           
                                <div>
                                    <img src={event.Group.previewImage}></img>
                                </div>
                                <div>
                                    <p>
                                        {event.Group.name}
                                    </p>
                                    <p>
                                        {state}
                                    </p>
                                </div>
                                                        
                             </div>
                        </Link>

                        <div>
                            <div>
                                <div>
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <div>
                                    {event.startDate} to {event.endDate}
                                </div>
                                
                            </div>
                            <div>
                                <div>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    {event.Venue.city}, {event.Venue.state}
                                </div>
                            </div>
                        </div>   
                    </div>

              
              

                    

                </div>
            </div>
        )
    }

    


}

export default EventDetails;