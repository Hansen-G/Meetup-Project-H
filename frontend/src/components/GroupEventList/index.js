import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link } from 'react-router-dom';
import { getGroupByIdThunk, getGroupEventThunk, getGroupMembersThunk } from '../../store/groups'



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

            <div className='groupEventContiner'>
                {(eventArr.length > 0) && eventArr.map(event => (
                    <Link to={`/event/${event.id}`}>
                        <div className='eventCard'>
                            <img src={event.previewImage}></img>

                            <p>{event.startDate}</p>
                            <p>{event.name}</p>
                            <p>{event.type}</p>
                            <p>Caoacity: {event.capacity}</p>
                            <p>{event.numAttending} attendees</p>
                            <p>Description</p>
                            <p>{event.description}</p>
                        </div>
                    </Link>

                ))}

            </div>

        </div>
    )
}

export default GroupEventList;

