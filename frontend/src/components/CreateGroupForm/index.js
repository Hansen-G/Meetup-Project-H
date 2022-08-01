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
    const [state, setState] = useState('AL');
    const [previewImage, setPreviewImage] = useState('')
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

  

        setErrors([]);
        dispatch(postNewGroupThunk(group)).then((res) => {
            history.push(`/groups/${res.newGroup.id}`)
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
            <h1>
                Create New Group:
            </h1>
            
            <form onSubmit={handleSubmit} >
                <h2>
                    First, set your group’s location.
                </h2>
                <p>
                    WeMeet groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.
                </p>

                <label>* City:<input type={'text'} value={city} onChange={e => setCity(e.target.value)} required></input></label>

                <label>* State:
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

                <h2>
                    What will your group’s name be?
                </h2>
                <p>
                    Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.
                </p>
                <label>* Name:<input type={'text'} value={name} onChange={e => setName(e.target.value)} required></input></label>
                
                
                <h2>
                    Now describe what {name} WeMeet Group will be about.
                </h2>
                <p>
                    People will see this when we promote your group, but you’ll be able to edit to it later, too.
                    <ol>
                        <li>What's the purpose of the group?</li>
                        <li>Who should join?</li>
                        <li>What will you do at your events?</li>
                        <li>Finally, upload a photo as the group's cover image (not required)!</li>
                    </ol>
                    
                </p>


                <label>* About:<textarea placeholder="More than 50 characters" type={'text'} row='5' id='about' value={about} onChange={e => setAbout(e.target.value)} required></textarea></label>
                <label>* Type:
                    <select onChange={e => setType(e.target.value)} value={type} required>

                        <option key={'In person'}>In person</option>
                        <option key={'Online'}>Online</option>

                    </select>
            
                    
                </label>
                <label>* Private:
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
                
                
                <button type="submit" disabled={errors.length} className={errors.length > 0 ? 'disabled' : 'enabled'}>Submit</button>
                
            </form>

        </div>
    );

}

export default CreateGroupFrom