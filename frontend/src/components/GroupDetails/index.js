import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { getGroupByIdThunk, getGroupEventThunk, getGroupMembersThunk, deleteGroupThunk } from '../../store/groups'

import EditGroupFrom from '../EditGroupForm';
import GroupEventList from '../GroupEventList'
import './GroupDetails.css'

function GroupDetails() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { groupId } = useParams();
    const [showEditGroupForm, setShowEditGroupForm] = useState(false);

    const group = useSelector(
        state => state.groups[groupId]
    )

    const user = useSelector(state => state.session.user);



    const helper = async (groupId) => {
        const groupWait = await dispatch(getGroupByIdThunk(groupId));
        const eventWait = await dispatch(getGroupEventThunk(groupId));
        const memberWait = await dispatch(getGroupMembersThunk(groupId));

    }
    useEffect(() => {
        helper(groupId)
    }, [dispatch]);

    const deleteListener = async (groupId) => {

        if (window.confirm('Do you really want to delete this Group? This action can not be undone!')) {
            const response = await dispatch(deleteGroupThunk(groupId));
            if (response) {
                window.alert('Successfully deleted the Group, Click OK to bring you back to Groups List')
                history.push('/groups');
            }
        }
    };


    if (!group) return null;

    const member = group.members
    if (!member || Object.keys(member).length === 0) return null;
    const memberArr = Object.values(member)
    console.log(memberArr)


    const eventArr = group.events

    if (!eventArr) return null;

    const imageArr = group.image
    if (!imageArr) return null;


    let state;
    if (group.private === true) {
        state = 'Private Group'
    } else {
        state = 'Public Group'
    }

    let showEditButton = false
    if (user && group) {
        if (user.id && group.organizerId && user.id === group.organizerId) {
            showEditButton = true;
        }
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


            <div className='group3 flex'>


                <div>
                    <Link to={`/events/groups/${groupId}`}>
                        Events
                    </Link>
                </div>

                <div className='group3ButtonContiner flex'>
                    <div className='group3Buttondiv'>
                        {showEditButton && (
                            <button className='group3Button' onClick={() => deleteListener(groupId)}>Delete</button>
                        )}

                    </div>

                    <div className='group3Buttondiv'>
                        {showEditButton && <button className='group3Button' onClick={() => (showEditGroupForm) ? setShowEditGroupForm(false) : setShowEditGroupForm(true)}>Edit Group</button>}

                    </div>
                </div>

            </div>

            <div>
                {showEditGroupForm && (
                    <EditGroupFrom hiddenForm={() => setShowEditGroupForm(false)} group={group} />
                )}
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
                    {(eventArr.length > 0) && eventArr.map(event => (
                        <Link to={`/event/${event.id}`}>
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
                        Members ({memberArr.length})
                    </h2>
                    <div>
                        {(memberArr.length > 0) && memberArr.map(member => (
                            <p key={member.id}>
                                {member.firstName} {member.lastName}
                            </p>
                        ))
                        }
                    </div>


                </div>

            </div>

        </div>
    )
}

export default GroupDetails;

