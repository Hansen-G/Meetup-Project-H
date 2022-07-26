import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch } from 'react-router-dom';
import { getGroupByIdThunk, getGroupEventThunk, getGroupMembersThunk } from '../../store/groups'


function GroupDetails () {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    console.log(groupId)

    const group = useSelector(
        state => state.groups[groupId]
    )
    // const member = useSelector(
    //     state => state.groups[groupId]
    // )

    // const events = useSelector(
    //     state => state.groups
    // )
    // console.log('!!!!', events)


    useEffect(() => {
        dispatch(getGroupByIdThunk(groupId));
        // dispatch(getGroupEventThunk(groupId));
        // dispatch(getGroupMembersThunk(groupId));
    }, [dispatch]);

    // useEffect(() => {
        
    //     dispatch(getGroupMembersThunk(groupId));
    // }, [dispatch]);

    if (!group) return null;


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
                        <i className="fa-solid fa-location-dot"></i>
                        {group.city}
                    </div>
                    <div>
                        <i className="fa-solid fa-user-group"></i>
                        {group.numMembers} members · {state}
                    </div>
                    <div>
                        <i className="fa-solid fa-user"></i>
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
                        Past events {}
                    </h2>

                    <h2>
                        Photos
                    </h2>

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
                    <p>
                        
                    </p>

                </div>

            </div>
            
        </div>
    )
}

export default GroupDetails;

