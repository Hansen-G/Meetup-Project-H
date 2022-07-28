import { csrfFetch } from './csrf';

const GET_EVENTLIST = 'events/GET_EVENTLIST';
const GET_EVENT_BY_ID = 'events/GET_EVENT_BY_ID';
const GET_EVENT_ATTENDEE = 'events/GET_EVENT_ATTENDEE';

const POST_NEW_EVENT = 'events/ POST_NEW_EVENT';
const PUT_UPDATE_EVENT = 'events/PUT_UPDATE_EVENT'

// // const POST_GROUP_NEW_EVENT = 'groups/POST_GROUP_NEW_EVENT';



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

// // const postNewGroup = (group) => {
// //     return {
// //         type: POST_NEW_GROUP,
// //         group
// //     }
// // }

// const putUpdateGroup = (group) => {
//     return {
//         type: PUT_UPDATE_EVENT,
//         group
//     }
// }





export const getEventListThunk = () => async dispatch => {
    const response = await fetch('/api/events')
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

// // export const postNewGroupThunk = (group) => async dispatch => {
// //     const response = await csrfFetch(`/api/groups`, {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(group)
// //     });
// //     if (response.ok) {
// //         const data = await response.json();
// //         dispatch(postNewGroup(data));
// //         return data;
// //     }
// // }

// // export const putUpdateGroupThunk = (newGroup, groupId) => async dispatch => {
// //     const response = await csrfFetch(`/api/groups/${groupId}`, {
// //         method: 'PUT',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(newGroup)
// //     });
// //     if (response.ok) {
// //         const data = await response.json();
// //         dispatch(putUpdateGroup(data));
// //         return data;
// //     }
// // }

// // export const getGroupEventThunk = (groupId) => async dispatch => {
// //     const response = await fetch(`/api/events/groups/${groupId}`);
// //     if (response.ok) {
// //         const data = await response.json();
// //         console.log(data)
// //         dispatch(getGroupEvents(data, groupId));
// //         return data;
// //     }
// // }

export const getEventAttendeeThunk = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}/attendees`);
   
    if (response.ok) {
        const data = await response.json();
        console.log('data', data)
        dispatch(getEventAttendee(data, eventId));
        return data;
    } else {
        console.log('HERE')

            dispatch(getEventAttendee([], eventId));
            return []
        
    }
}

// // export const getGroupImagesThunk = (groupId) => async dispatch => {
// //     const response = await fetch(`/api/groups/${groupId}/members`);
// //     if (response.ok) {
// //         const data = await response.json();
// //         dispatch(getGroupImages(data.Members, groupId));
// //         return data;
// //     }
// // }



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
        // case POST_NEW_GROUP: {
        //     newState = { ...state };
        //     newState[action.group.id] = action.group;
        //     return newState;
        // }
        // case PUT_UPDATE_GROUP: {
        //     newState = { ...state };
        //     newState[action.groupId] = { ...newState[action.groupId], events: action.events };
        //     return newState
        // }
        // case GET_GROUP_EVENTS: {
        //     newState = { ...state };
        //     newState[action.groupId] = { ...newState[action.groupId], events: action.events };
        //     return newState
        // }
        case GET_EVENT_ATTENDEE: {
            newState = { ...state };
            const attendees = {};
            action.attendees.forEach(attendee => attendees[attendee.id] = attendee);
           
            newState[action.eventId] = { ...newState[action.eventId], attendees }
 
            return newState;
        }
        default: {
            return state
        }

    }
};

export default eventsReducer;

