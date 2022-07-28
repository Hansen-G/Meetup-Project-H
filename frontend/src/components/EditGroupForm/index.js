import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { putUpdateGroupThunk } from '../../store/groups'

function EditGroupFrom({hiddenForm, group}) {

    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) {
        window.alert('You need login to create a group')
        history.push(`/login`);
    }


    const [name, setName] = useState(group.name);
    const [about, setAbout] = useState(group.about);
    const [type, setType] = useState(group.type);
    const [privateStatus, setPrivateStatus] = useState(group.private);
    const [city, setCity] = useState(group.city);
    const [state, setState] = useState(group.state);
    const [previewImage, setPreviewImage] = useState(group.previewImage)
    const [check, setCheck] = useState(true)

    const checkInput = (e) => {
        if (e.length > 0) setCheck(false)

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let privateBoolean;

        if (privateStatus === 'Private Group') {
            privateBoolean = true

        } else if (privateStatus === 'Public Group') {
            privateBoolean = false
        }
        

        const newGroup = {
            name,
            about,
            type,
            private: privateBoolean,
            city,
            state,
            previewImage
        };

        console.log('group', newGroup)
        let newGroupRes;
        try {
            newGroupRes = await dispatch(putUpdateGroupThunk(newGroup, group.id));
            console.log('newGroup', newGroupRes)

        } catch (error) {
            console.log(error);
        }

        if (newGroupRes) {
            history.push(`/groups/${newGroupRes.id}`);
            hiddenForm();
            // window.location.reload(true);
        }

    };
    return (
        <div className="createGroup">
            Edit Your Group:
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
                <button onClick={hiddenForm}>Cancle</button>
                <button type="submit" >Submit</button>

               
                
            </form>

        </div>
    );

}

export default EditGroupFrom