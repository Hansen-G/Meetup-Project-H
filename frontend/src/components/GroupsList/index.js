import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { getGroupListThunk } from '../../store/groups'



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

    return (
        <main>
            <div>
                <NavLink to="/events" className='tab'>
                    Events
                </NavLink>

                <NavLink to="/groups" className='tab'>
                    Groups
                </NavLink>

                <div>
                    {
                        groupArr.map(group => (
                            <div key={group.id}>
                                <div className='groupImg'>
                                    <img src={group.previewImage}></img>
                                </div>
                                <div className='groupInfo'>
                                    {`Group ${group.name}: `}
                                    <Link to={`/groups/${group.id}`}>{`Group ${group.id}`}</Link>
                                    {group.city};
                                    {group.state}
                                    {group.about}
                                    {group.numMembers}·{group.private}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}
export default GroupList;