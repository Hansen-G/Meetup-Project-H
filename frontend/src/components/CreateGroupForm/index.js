import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CreateGroupFrom.css"
import { postNewGroupThunk } from '../../store/groups'

function CreateGroupFrom () {
    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    
    if (!sessionUser) {
        window.alert('You need login to create a group')
        history.push(`/login`);   
    }

   
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('In person');
    const [privateStatus, setPrivateStatus] = useState('Private Group');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [previewImage, setPreviewImage] = useState('')
    const [check, setCheck] = useState(true)

    const checkInput = (e) => {
        if (e.length > 0) setCheck(false)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let privateBoolean;

        if (privateStatus === 'Private Group') {
            privateBoolean = true

        } else if (privateStatus === 'Public Group'){
            privateBoolean = false
        }

        const group = {
            organizerId: sessionUser.id,
            name,
            about,
            type,
            private: privateBoolean,
            city,
            state,
            previewImage
        };

        console.log('group',group)
        let newGroup;
        try {
            newGroup = await dispatch(postNewGroupThunk(group));
            console.log('newGroup', newGroup)

        } catch (error) {
            console.log(error);
        }

        if (newGroup) {
            history.push(`/groups/${newGroup.newGroup.id}`);
        }

    };
    return (
        <div className="createGroup">
            Create New Group:
            <form onSubmit={handleSubmit} >
                <label>Name:<input type={'text'} value={name} onChange={e => setName(e.target.value)}></input></label>
                <label>About:<input type={'text'} value={about} onChange={e => setAbout(e.target.value)}></input></label>
                <label>Type:
                    <select onChange={e => setType(e.target.value)} value={type}>

                        <option key={'In person'}>In person</option>
                        <option key={'Online'}>Online</option>

                    </select>
            
                    
                </label>
                <label>Private:
                    <select onChange={e => setPrivateStatus(e.target.value)} value={privateStatus}>
                        
                        <option key={'Private Group'}>Private Group</option>
                        <option key={'Public Group'}>Public Group</option>
                   
                    </select>
                    
                </label>

                <label>City:<input type={'text'} value={city} onChange={e => setCity(e.target.value)}></input></label>
                <label>State:<input type={'text'} value={state} onChange={e => setState(e.target.value)}></input></label>
                <label>Preview Image:<input type={'text'} value={previewImage} onChange={e => setPreviewImage(e.target.value)}></input></label>
                <button type="submit" >Submit</button>
                {/* <button onClick={hiddenForm}>Cancle</button> */}
            </form>

        </div>
    );

}

export default CreateGroupFrom