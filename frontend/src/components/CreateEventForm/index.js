import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//TBC
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

    const [venueId, setVenueId] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('In Person');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [eventPreviewImage, setEventPreviewImage] = useState('')

    const [check, setCheck] = useState(true)

    const checkInput = (e) => {
        if (e.length > 0) setCheck(false)

    }



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
                capacity,
                price,
                description,
                startDate: start,
                endDate: end,
                venueId: 1
            };
        } else {
            event = {
                name,
                type,
                capacity,
                price,
                description,
                startDate: start,
                endDate: end,
                venueId
            };
        }


        console.log('Event', event)
        let newEvent;
        try {
            newEvent = await dispatch(postNewEventThunk(event, group.id));
            console.log('newGroup', newEvent)

        } catch (error) {
            console.log(error);
        }

        if (newEvent) {
            history.push(`/events/${newEvent.id}`);
        }

    };
    return (
        <div className="createGroup">
            Create A New Event For Your Group:
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
                            <input type={'number'} value={venueId} onChange={e => setVenueId(e.target.value)}></input>
                    </label>)
                }
                <label>Capacity:<input type={'number'} value={capacity} onChange={e => setCapacity(e.target.value)}></input></label>
                <label>Price:<input type={'number'} value={price} onChange={e => setPrice(e.target.value)}></input></label>
                <label>Start Date:<input type={'datetime-local'} value={startDate} onChange={e => setStartDate(e.target.value)}></input></label>
                <label>End Date:<input type={'datetime-local'} value={endDate} onChange={e => setEndDate(e.target.value)}></input></label>
                <label>Preview Image:<input type={'text'} value={eventPreviewImage} onChange={e => setEventPreviewImage(e.target.value)}></input></label>
                <button onClick={hiddenForm}>Cancle</button>
                <button type="submit" >Submit</button>
               
            </form>

        </div>
    );

}

export default CreateEventFrom