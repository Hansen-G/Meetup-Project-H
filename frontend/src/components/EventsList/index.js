import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { getEventListThunk } from '../../store/events'



function EventList() {
    const dispatch = useDispatch();

    const events = useSelector(
        state => state.events
    )

    useEffect(() => {
        dispatch(getEventListThunk());
    }, [dispatch])


    if (!events || Object.keys(events).length === 0) {
        return null;
    }
    const eventArr = Object.values(events)

    
    return (
        <main>
            <div>
                <NavLink to="/events" className='tab'>
                    Events
                </NavLink>

                <NavLink to="/groups" className='tab'>
                    Groups
                </NavLink>

                <div>
                   
                    {
                        eventArr.map(event => (
                            <div key={event.id}>
                                <Link to={`/events/${event.id}`}>
                                    <div className='eventImg'>
                                        <img src={event.previewImage}></img>
                                    </div>
                                    <div className='eventInfo'>
                                        {`Event ${event.name}: `}
                                        
                                        {event.Group.name}

                                        Venue: {event.Venue.city}, {event.Venue.state}
                                        {event.numAttending} attendees             
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}
export default EventList;