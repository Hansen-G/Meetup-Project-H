import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { getGroupListThunk } from '../../store/groups'

import './GroupList.css'

function GroupList() {
    const dispatch = useDispatch();

    const groups = useSelector(
        state => state.groups
    )
    

    useEffect(() => {
        dispatch(getGroupListThunk());
    }, [dispatch])
    
   
    if (!groups || Object.keys(groups).length === 0) {
        return null;
    }
    const groupArr = Object.values(groups)

    function groupP (group) {
        let state;
        if (group.private === true) {
            state = 'Private Group'
        } else {
            state = 'Public Group'
        }
        return state
    }

    return (
        <main>
            <div>
                <div className='navTab'>
                    <NavLink to="/events">
                        <div className='tab notSelected' id='eventTab'>
                            Events
                        </div>
                       
                    </NavLink>

                    <NavLink to="/groups" className='tab'>
                        <div className='tab selected'>
                            Groups
                        </div>
                    </NavLink>
                </div>
                

                <div className='groupList'>
                    {
                        groupArr.map(group => (
                            <Link to={`/groups/${group.id}`}>
                                <div key={group.id} className='groupCard flex'>
                                    <div className='groupImgDiv'>
                                        <img className='groupImgPre' src={group.previewImage}></img>
                                    </div>
                                    <div className='groupInfo'>
                                        <p className='groupName'>
                                            {group.name}
                                        </p>
                                        <p className='groupLocation'> 
                                            {group.city}, {group.state}
                                        </p>
                                        <div className='groupAbout aboutLong'>
                                            {group.about.slice(0,200)}...
                                        </div>
                                        <p className='groupAbout'>
                                            {group.numMembers} members · {groupP(group)}
                                        </p>
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
export default GroupList;