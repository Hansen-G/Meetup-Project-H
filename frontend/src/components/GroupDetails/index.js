import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link } from 'react-router-dom';
import { getGroupByIdThunk, getGroupEventThunk, getGroupMembersThunk } from '../../store/groups'
import './GroupDetails.css'

function GroupDetails () {
    const dispatch = useDispatch();
    const { groupId } = useParams();

    const group = useSelector(
        state => state.groups[groupId]
    )

    // const member = useSelector(
    //     state => state.groups[groupId].members
    // )
    // const events = useSelector(
    //     state => state.groups[groupId].events
    // )
    // console.log('!!!!', events)

    const helper = async (groupId) => {
        const groupWait = await dispatch(getGroupByIdThunk(groupId));
        const eventWait= await dispatch(getGroupEventThunk(groupId));
        const memberWait = await dispatch(getGroupMembersThunk(groupId));
    
    }
    useEffect(() => {
        helper(groupId)
    }, [dispatch]);


    if (!group) return null;
    
    const member = group.members
    if (!member) return null;
    const memberArr = [...member]
    memberArr.shift()
    const eventArr = group.events
    if (!eventArr) return null;

    const imageArr = group.image
    if (!imageArr) return null;


    let state;
    if (group.private == 'true'){
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
            <div className='group2 flex'>
                <div className='group2Left'>
                    <h2>
                        What we're about
                    </h2>
                    <p>
                        {group.about}
                    </p>

                    <h2>
                        Events ({eventArr.length})
                    </h2>
                    {eventArr.map(event => (
                        <Link to={`event/${event.id}`}>
                            <div className='eventCard'>
                                <p>{event.startDate}</p>
                                <p>{event.name}</p>
                                <p>{event.type}</p>
                                <p>{event.numAttending} attendees</p>
                            </div>
                        </Link>
                        
                    ))}

                    <h2>
                        Photos
                    </h2>
                    <div className='groupDetailsImgContiner'>
                    {imageArr.map(img => (
                
                       
                            <img src={img} className='groupDetailsImg'></img>
            
                    ))}
                    </div>

                </div>

                <div className='group2Right'>
                    <h2>
                        Organizer
                    </h2>
                    <p>
                        {group.Organizer.firstName} {group.Organizer.lastName}
                    </p>

                    <h2>
                        Members
                    </h2>
                    <dib>
                        {
                            memberArr.map(member => (
                            <p>
                                {member.firstName} {member.lastName} 
                            </p>
                            ))
                        }
                    </dib>
     

                </div>

            </div>
            
        </div>
    )
}

export default GroupDetails;
