import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link } from 'react-router-dom';
import { getGroupByIdThunk, getGroupEventThunk, getGroupMembersThunk } from '../../store/groups'

function timeHelper(date) {
    let time = new Date(date)
    return time.toString().slice(0, 21)
}

function GroupEventList() {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    console.log('groupId', groupId)
    const [showEditGroupForm, setShowEditGroupForm] = useState(false);

    const group = useSelector(
        state => state.groups[groupId]
    )

    const user = useSelector(state => state.session.user);

    const helper = async (groupId) => {
        const groupWait = await dispatch(getGroupByIdThunk(groupId));
        const eventWait = await dispatch(getGroupEventThunk(groupId));
    }
    useEffect(() => {
        helper(groupId)
    }, [dispatch]);


    if (!group) return null;

    const eventArr = group.events
    console.log('eventArr',eventArr)

    if (!eventArr) return null;
    let state;
    if (group.private === true) {
        state = 'Private Group'
    } else {
        state = 'Public Group'
    }


    return (
        <div>
            <div className='group1 flex'>
                <div className='groupImg'>
                    <img src={group.previewImage}>
                    </img>
                </div>
                <div>
                    <h1>
                        {group.name}
                    </h1>
                    <div>
                        <i className="fa-solid fa-location-dot icon"></i>
                        {group.city}
                    </div>
                    <div>
                        <i className="fa-solid fa-user-group icon"></i>
                        {group.numMembers} members · {state}
                    </div>
                    <div>
                        <i className="fa-solid fa-user icon"></i>
                        Organized by {group.Organizer.firstName} {group.Organizer.lastName}
                    </div>

                </div>
            </div>

            <div className='eventList'>
                {(eventArr.length > 0) && eventArr.map(event => (
                    <Link to={`/events/${event.id}`}>
                        <div className='eventCard flex'>
                            <div className='eventImgDiv'>
                                <img className='eventImgPre' src={event.previewImage}></img>
                            </div>
                            <div className='eventInfo'>
                                <div className='eventTime'> {timeHelper(event.startDate)} EST</div>
                                <div className='eventName'>{event.name} </div>
                                <div className='eventGroup'> {event.Group.name} · {event.Venue.city}, {event.Venue.state}</div>
                                <div className='eventAttendee'> {event.numAttending} attendees</div>
                            </div>

                            
                        </div>
                    </Link>
                ))}

                {(eventArr.length == 0) && (
                    <div>
                        This group has no event now. Please see more events on the Event page.
                    </div>
                )}

            </div>

        </div>
    )
}

export default GroupEventList;

