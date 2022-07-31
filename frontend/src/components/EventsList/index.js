import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getEventListThunk } from '../../store/events'
import './EventList.css'

function timeHelper (date){
    let time = new Date(date)
    return time.toString().slice(0,21)
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
                    <div className='tab selected' id='eventTab'>
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
                                <div key={event.id} className='eventCard flex card'>
                                    
                                        <div className='eventImgDiv'>
                                            <img className='eventImgPre'src={event.previewImage}></img>
                                        </div>
                                        <div className='eventInfo'>    
                                            <div className='eventTime'> {timeHelper(event.startDate)} EST</div>
                                            <div className='eventName'>{event.name} </div>    
                                            <div className='eventGroup'> {event.Group.name} · {event.Venue.city}, {event.Venue.state}</div>
                                            <div className='eventAttendee'> {event.numAttending} attendees</div>             
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