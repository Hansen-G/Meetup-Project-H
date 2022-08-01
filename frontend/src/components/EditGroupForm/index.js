import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { putUpdateGroupThunk } from '../../store/groups';
import './EditGroupForm.css'

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
    const [privateStatus, setPrivateStatus] = useState('Private Group');
    const [city, setCity] = useState(group.city);
    const [state, setState] = useState(group.state);
    const [previewImage, setPreviewImage] = useState(group.previewImage)
    const [check, setCheck] = useState(true)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const newError = [];
        if (name.length > 60) newError.push("Name must be 60 characters or less");
        if (name.length === 0) newError.push("You must set a name for the group");
        if (about.length < 50) newError.push("About must be 50 characters or more");
        if (about.length > 1000) newError.push("About must be less than 1000 characters");
        if (type !== 'Online' && type !== 'In person') newError.push("Type must be Online or In person");
        if (privateStatus !== 'Private Group' && privateStatus !== 'Public Group') newError.push("You need set the status of your group");
        if (city.length > 1000) newError.push("City must be less than 1000 characters");
        if (city.length === 0) newError.push("City is required");
        if (state.length > 1000) newError.push("State must be less than 1000 characters");
        if (state.length === 0) newError.push("State is required");
        if (previewImage.length > 1000) newError.push("Image URL must be less than 1000 characters");
        setErrors(newError)
        if (errors.length > 0) setCheck(true)
        if (errors.length === 0) setCheck(false)

    }, [name, about, type, privateStatus, city, state, previewImage])


    const handleSubmit = async (e) => {
        e.preventDefault();

        let privateBoolean;

        if (privateStatus == 'Private Group') {
            privateBoolean = true

        } else if (privateStatus == 'Public Group') {
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

        setErrors([]);

        dispatch(putUpdateGroupThunk(newGroup, group.id)).then((res) => {
   
 
            history.push(`/groups/${res.id}`);
            hiddenForm();
        }).catch(
            async (res) => {
                const data = await res.json();
                if (Object.keys(data.errors).length > 0) {
                    let bandEndError = Object.values(data.errors)
                    bandEndError.unshift('The group name is already exist, please change your group name')
                    setErrors(bandEndError);
                }
            }
        )
    };
    return (
        <div className="createGroup">
            <h2>
                Edit Your Group:
            </h2>
            
            <form onSubmit={handleSubmit} >

                <label>City:<input type={'text'} value={city} onChange={e => setCity(e.target.value)} required></input></label>

                <label>State:
                    <select onChange={e => setState(e.target.value)} value={state} required>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </label>

             
                <label>Name:<input type={'text'} value={name} onChange={e => setName(e.target.value)} required></input></label>


                <label>About:<textarea placeholder="More than 50 characters" type={'text'} row='5' id='about' value={about} onChange={e => setAbout(e.target.value)} required></textarea></label>
                <label>Type:
                    <select onChange={e => setType(e.target.value)} value={type} required>

                        <option key={'In person'}>In person</option>
                        <option key={'Online'}>Online</option>

                    </select>


                </label>
                <label>Private:
                    <select onChange={e => setPrivateStatus(e.target.value)} value={privateStatus} required>

                        <option key={'Private Group'}>Private Group</option>
                        <option key={'Public Group'}>Public Group</option>
                    </select>
                </label>




                <label>Preview Image:<input type={'text'} value={previewImage} onChange={e => setPreviewImage(e.target.value)}></input></label>



                {errors.length > 0 && (
                    <p>
                        Please correct the following error(s) before submit:
                    </p>
                )}

                <ol>
                    {errors.map((error, idx) => (
                        <li key={idx} className='create-group-error'>{error}</li>
                    ))}
                </ol>

                <button onClick={hiddenForm} className='enabled' id='editgroup'>Cancel</button>
                <button type="submit" disabled={errors.length} className={errors.length> 0 ? 'disabled' : 'enabled'} id='editgroup'>Submit</button>

            </form>
            
        </div>
    );

}

export default EditGroupFrom