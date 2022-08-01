import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postNewEventThunk } from '../../store/events'



function timeChanger (time) {
    let timeArr = time.split('T')
    let clock = timeArr[1]
    timeArr[1] = clock + ':00';
    let result = timeArr.join(' ')
    return result
}

function CreateEventFrom({ hiddenForm, group }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [venueId, setVenueId] = useState(2);
    const [name, setName] = useState('');
    const [type, setType] = useState('In Person');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [eventPreviewImage, setEventPreviewImage] = useState('')
    const [check, setCheck] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        console.log(price)
        console.log('!!!', venueId)
        const newError = [];
        if (!name) newError.push("Name name is required");
        if (name.length < 5) newError.push("Name must be at least 5 characters");
        
        if (description.length < 1) newError.push("Description is required");
        if (description.length > 1000) newError.push("Description must be less than 1000 characters");
        if (type !== 'Online' && type !== 'In Person') newError.push("Type must be Online or In Person");
        if (!price) newError.push("Price is required")
        if (!capacity) newError.push("Capacity is required")
       
        if (Number.isNaN(Number(price))) newError.push('Price must be a number')
        if (price < 0) newError.push("Price is invalid")
        if (capacity < 0) newError.push("Capacity is invalid")

        if (!Number.isInteger(Number(capacity))) newError.push('Capacity is invalid')
        if (eventPreviewImage.length > 1000) newError.push("Image URL must be less than 1000 characters");

        if (!startDate) newError.push("Start date is required")
        if (!endDate) newError.push("End date is required")
        if (Date.parse(startDate) < Date.now()) newError.push('The event must start in the future');
        if (Date.parse(endDate) < Date.parse(startDate)) newError.push('The event must not end before it starts');
        
        setErrors(newError)
        if (errors.length > 0) setCheck(true)
        if (errors.length === 0) setCheck(false)

    }, [venueId, name, type, capacity, price, description, startDate, endDate, eventPreviewImage])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let start = timeChanger(startDate)
        let end = timeChanger(endDate)
        console.log('Here')
        let event;
        if (type === 'Online') {
            event = {         
                name,
                type,
                capacity: parseInt(capacity),
                price: parseInt(price),
                description,
                startDate: start,
                endDate: end,
                venueId: 1
            };
        } else {
            event = {
                name,
                type,
                capacity: parseInt(capacity),
                price: parseInt(price),
                description,
                startDate: start,
                endDate: end,
                venueId
            };
        }


        setErrors([])

        dispatch(postNewEventThunk(event, group.id)).then((res) => {
            console.log('!!!!!!!!!', res)
            history.push(`/events/${res.id}`);
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
        
        let newEvent;
        try {
            newEvent = await dispatch(postNewEventThunk(event, group.id));
            
          

        } catch (error) {
            console.log(error);
        }

        if (newEvent) {
            history.push(`/events/${newEvent.id}`);
        }

    };
    return (
        <div className="createGroup">
            <h2>
                Create A New Event For Your Group:
            </h2>
            <form onSubmit={handleSubmit} >
                <label>Name:<input type={'text'} value={name} onChange={e => setName(e.target.value)}></input></label>
                <label>Description:<input type={'text'} value={description} onChange={e => setDescription(e.target.value)}></input></label>
                <label>Type:
                    <select onChange={e => setType(e.target.value)} value={type}>
                        <option key={'In Person'}>In Person</option>
                        <option key={'Online'}>Online</option>
                    </select>

                </label>

                {
                    (type === 'In Person') && (
                    <label>
                        Venue ID:
                            <select onChange={e => setVenueId(e.target.value)} value={venueId}>
                                <option value='2' key={'2'}>2</option>
                                <option value='3' key={'3'}>3</option>
                                <option value='4' key={'4'}>4</option>
                                <option value='5' key={'5'}>5</option>
                            </select>

                    </label>)
                }
                <label>Capacity:
                    <input type={'number'} 
                    value={capacity} 
                    onChange={e => setCapacity(e.target.value)}
                    min='0'
                    step='1'
                    ></input></label>
                <label>Price:
                    <input type={'number'} 
                    value={price} 
                    onChange={e => setPrice(e.target.value)}
                    min='0'
                    step='0.01'
                    ></input></label>
                <label>Start Date:
                    <input type={'datetime-local'} 
                    value={startDate} 
                    onChange={e => setStartDate(e.target.value)}
                    min={new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]}
                    step='any'
                    ></input>
                </label>
                <label>End Date:
                    <input type={'datetime-local'} 
                    value={endDate} 
                    onChange={e => setEndDate(e.target.value)}
                    min={startDate}
                    step='any'
                    ></input></label>
                <label>Preview Image:<input type={'text'} value={eventPreviewImage} onChange={e => setEventPreviewImage(e.target.value)}></input></label>
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
                <button type="submit" disabled={errors.length} className={errors.length > 0 ? 'disabled' : 'enabled'} id='editgroup'>Submit</button>

               
            </form>

        </div>
    );

}

export default CreateEventFrom