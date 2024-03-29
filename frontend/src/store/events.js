import { csrfFetch } from './csrf';
import { getGroupListThunk } from './groups';

const GET_EVENTLIST = 'events/GET_EVENTLIST';
const GET_EVENT_BY_ID = 'events/GET_EVENT_BY_ID';
const GET_EVENT_ATTENDEE = 'events/GET_EVENT_ATTENDEE';

const POST_NEW_EVENT = 'events/ POST_NEW_EVENT';
const PUT_UPDATE_EVENT = 'events/PUT_UPDATE_EVENT';
const DELETE_EVENT = 'groups/DELETE_EVENT'


const getEventList = (events) => {
    return {
        type: GET_EVENTLIST,
        events
    }
}

const getEventById = (event) => {
    return {
        type: GET_EVENT_BY_ID,
        event
    }
}

const getEventAttendee = (attendees, eventId) => {
    return {
        type: GET_EVENT_ATTENDEE,
        attendees,
        eventId
    }
}

const postNewEvent = (event) => {
    return {
        type: POST_NEW_EVENT,
        event
    }
}

const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        eventId
    }
}

export const getEventListThunk = () => async dispatch => {
    const response = await fetch(`/api/events`)
    if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        dispatch(getEventList(data));
        return data
    }
}

export const getEventByIdThunk = (eventId) => async dispatch => {
    const response = await fetch(`/api/events/${eventId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(getEventById(data));
        return data
    }
}

export const postNewEventThunk = (event, groupId) => async dispatch => {
    const response = await csrfFetch(`/api/events/new/groups/${groupId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });
    if (response.ok) {
        const data = await response.json();
       
        await dispatch(postNewEvent(data));
        await dispatch(getGroupListThunk());
        await dispatch(getEventListThunk());
        return data;
    }
    return response
}

export const getEventAttendeeThunk = (eventId) => async dispatch => {
    const response = await fetch(`/api/events/${eventId}/attendees`);
   
    if (response.ok) {
        const data = await response.json();
        console.log('data', data)
        dispatch(getEventAttendee(data, eventId));
        return data;
    } else {
        console.log('Here')
        dispatch(getEventAttendee(['No auth'], eventId));
        return ['No auth']
    }
}


export const deleteEventThunk = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        await dispatch(deleteEvent(eventId));
        await dispatch(getGroupListThunk());
        await dispatch(getEventListThunk());
        return response.ok;
    }
    return response
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_EVENTLIST: {
            newState = { ...state };
            action.events.map(action => newState[action.id] = action)
            newState = { ...newState }
            return newState
        }
        case GET_EVENT_BY_ID: {
            newState = { ...state };
            newState[action.event.id] = action.event
            return newState;
        }
        case POST_NEW_EVENT: {
            newState = { ...state };
            console.log('action.event', action.event)
            newState[action.event.id] = action.event;
            return newState;
        }
        case GET_EVENT_ATTENDEE: {
            newState = { ...state };
            const attendees = {};
            if (action.attendees && action.attendees[0] == 'No auth'){
                attendees['Auth'] = false
                newState[action.eventId] = { ...newState[action.eventId], attendees }
                return newState;
            } else {
                attendees['Auth'] = true
                action.attendees.forEach(attendee => attendees[attendee.id] = attendee);
                newState[action.eventId] = { ...newState[action.eventId], attendees }
                return newState;
            }
        }
        case DELETE_EVENT:{
            newState = { ...state };
            delete newState[action.eventId];
            return newState;
        }
        default: {
            return state
        }

    }
};

export default eventsReducer;

