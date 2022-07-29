import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getEventListThunk } from '../../store/events'
import './EventList.css'

function timeHelper (date){
    let time = new Date(date)
    return time.toString()
}

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
            <div className='navTab'>
                <NavLink to="/events">
                    <div className='tab selected'>
                        Events
                    </div>

                </NavLink>

                <NavLink to="/groups" className='tab'>
                    <div className='tab noSelected'>
                        Groups
                    </div>
                </NavLink>
            </div>

            <div className='eventList'>
                <div>
                   
                    {
                        eventArr.map(event => (
                            <Link to={`/events/${event.id}`}>
                                <div key={event.id} className='eventCard flex'>
                                    
                                        <div className='eventImgDiv'>
                                            <img className='eventImgPre'src={event.previewImage}></img>
                                        </div>
                                        <div className='eventInfo'>
                                            {`Event ${event.name}: `}
                                            
                                            {event.Group.name}

                                            {timeHelper(event.startDate)}

                                            Venue: {event.Venue.city}, {event.Venue.state}
                                            {event.numAttending} attendees             
                                        </div>
                                
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}
export default EventList;