import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { getEventByIdThunk, getEventAttendeeThunk } from '../../store/events'

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
        const attendeeWait = await dispatch(getEventAttendeeThunk(eventId));
    }

    useEffect(() => {
        helper(eventId)
    }, [dispatch]);

    if(!event) return null;

    let attendees = event.attendees

    if (!attendees || Object.keys(attendees).length === 0) return null;

    let attendeesArr;

    if (attendees['Auth']) {
        let attendeesObj = {...attendees}
        delete attendeesObj['Auth']
        attendeesArr = Object.values(attendeesObj)
    }
    
    console.log('attendeesArr', attendeesArr)

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

                <div className='event2 flex'>
                    <div className='event2Left'>

                        <div className='eventDetails'>
                            <h3>
                                Details
                            </h3>
                            
                            {(attendees['Auth']) && (
                            <p>
                                { event.description }
                            </p>)
                            }
                            {!(attendees['Auth']) && (
                                <p>
                                    <i className="fa-solid fa-lock"></i>
                                    This content is available only to members
                                </p>
                                )
                            }
                            
                        </div>

                        <div className='eventAttendees'>
                            <h3>
                                Attendees
                            </h3>
                            {(attendees['Auth']) && (
                                <p>
                                    {(attendeesArr.length > 0) && attendeesArr.map(attendee => (
                                        <p key={attendee.id}>
                                            {attendee.firstName} {attendee.lastName} - {attendee.EventAttendees[0].attendeeStatus}
                                        </p>
                                    ))
                                    }
                                </p>)}
                            {!(attendees['Auth']) && (
                                <p>
                                    <i className="fa-solid fa-lock"></i>
                                    This content is available only to members
                                </p>
                            )}
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
                                    {event.Venue.address}, {event.Venue.city}, {event.Venue.state}
                                </div>
                                <div id="map"></div>
                            </div>
                        </div>
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
                            {(attendees['Auth']) && (
                            <p>
                                {(attendeesArr.length > 0) && attendeesArr.map(attendee => (
                                    <p key={attendee.id}>
                                        {attendee.firstName} {attendee.lastName} - {attendee.EventAttendees[0].attendeeStatus}
                                    </p>
                                ))
                                }
                            </p>)}
                            {(attendees['Auth']) && (
                                <p>
                                    {(attendeesArr.length == 0) && (
                                        <div>
                                            No attendee yet
                                        </div>
                                    )
                                    }
                                </p>)}

                            {!(attendees['Auth']) && (
                                <p>
                                    <i className="fa-solid fa-lock"></i>
                                    This content is available only to members
                                </p>
                            )}
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
                                    {event.Venue.address}, {event.Venue.city}, {event.Venue.state}
                                </div>
                                <div id="map"></div>
                            </div>
                        </div>   
                    </div>

              
              

                    

                </div>
            </div>
        )
    }

    


}

export default EventDetails;