import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { getEventByIdThunk, getEventAttendeeThunk, deleteEventThunk } from '../../store/events'
import './EventDetails.css'

function timeHelper(date) {
    let time = new Date(date)
    return time.toString().slice(0, 21)
}

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


  
    let group = event.Group;
    console.log(group)

    let showEditButton = false
    if (user && group) {
        if (user.id && group.organizerId && user.id === group.organizerId) {
            showEditButton = true;
        }
    }


    const deleteListener = async (eventId) => {

        if (window.confirm('Do you really want to delete this Event? This action can not be undone!')) {
            const response = await dispatch(deleteEventThunk(eventId));
            if (response) {
                window.alert('Successfully deleted the Event, Click OK to bring you back to Events List')
                history.push(`/events/groups/${group.id}`);
            }
        }
    };


    let state;
    if (event.Group.private === true) {
        state = 'Private Group'
        return (
            <div className='event'>
                <div className='event1'>
                    <p>
                        {timeHelper(event.startDate)}
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

                    {showEditButton && (
                        <button className='group3Button' onClick={() => deleteListener(eventId)}>Delete</button>
                    )}

                </div>

                <div className='event3Buttondiv'>
                   
                </div>

                <div className='event2 flex'>
                    <div className='event2Left'>
                        <div className='event2Img'>
                            <img src={event.previewImage}></img>
                        </div>

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
                                <div className='noAuthCard flex'>
                                    <i className="fa-solid fa-lock noAuth"></i>
                                    <p>
                                        This content is available only to members
                                    </p>
                                    
                                </div>

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
                                <div className='noAuthCard flex'>
                                    <i className="fa-solid fa-lock noAuth"></i>
                                    <p>
                                        This content is available only to members
                                    </p>

                                </div>
                            )}
                        </div>

                     
                    </div>
                    <div className='event2Right'>
                        <Link to={`/groups/${event.Group.id}`}>
                            <div className='eventGroupCard2 flex'>
                                <div className='eventGroupCard2Img'>
                                    <img id='eventGroupCard2Img' src={event.Group.previewImage}></img>
                                </div>
                                <div className='groupInfoCard flex'>
                                    <div className='groupInfoCardName'>
                                        {event.Group.name}
                                    </div>
                                    <div>
                                        {state}
                                    </div>
                                </div>

                            </div>
                        </Link>

                        <div className='eventInfoDetial'>
                            <div className='eventInfoDetialTime flex'>
                                <div className='eventInfoDetialIcon'>
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <div className='eventInfoText'>
                                    {timeHelper(event.startDate)} to {timeHelper(event.endDate)}
                                </div>

                            </div>
                            <div className='eventInfoDetialLocation flex'>
                                <div className='eventInfoDetialIcon'>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className='eventInfoText'>
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
                        {timeHelper(event.startDate)}
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
                            <div className='event2Img'>
                                <img src={event.previewImage}></img>
                            </div>

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
                    </div>
                    <div className='event2Right'>
                        <Link to={`/groups/${event.Group.id}`}>
                            <div className='eventGroupCard2 flex'>
                                <div className='eventGroupCard2Img'>
                                    <img id='eventGroupCard2Img' src={event.Group.previewImage}></img>
                                </div>
                                <div className='groupInfoCard flex'>
                                    <div className='groupInfoCardName'>
                                        {event.Group.name}
                                    </div>
                                    <div>
                                        {state}
                                    </div>
                                </div>

                            </div>
                        </Link>

                        <div className='eventInfoDetial'>
                            <div className='eventInfoDetialTime flex'>
                                <div className='eventInfoDetialIcon'>
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <div className='eventInfoText'>
                                    {timeHelper(event.startDate)} to {timeHelper(event.endDate)}
                                </div>

                            </div>
                            <div className='eventInfoDetialLocation flex'>
                                <div className='eventInfoDetialIcon'>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className='eventInfoText'>
                                    {event.Venue.address}, {event.Venue.city}, {event.Venue.state}
                                </div>
                            </div>
                        </div>

                        <div id="map">
                            <div id="map">
                                <div id="map" dangerouslySetInnerHTML={{ __html: event.Venue.html }} />
                            </div>
                            

                        </div>
                    </div>

              
              

                    

                </div>
            </div>
        )
    }

    


}

export default EventDetails;