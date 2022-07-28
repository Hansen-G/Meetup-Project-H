import { csrfFetch } from './csrf';

const GET_GROUPLIST = 'groups/GET_GROUPLIST';
const GET_GROUP_BY_ID = 'groups/GET_GROUP_BY_ID';
const GET_GROUP_MEMBERS = 'groups/GET_GROUP_MEMBERS';
const GET_GROUP_EVENTS = 'groups/GET_GROUP_EVENTS';


const POST_NEW_GROUP = 'groups/ POST_NEW_GROUP';
const PUT_UPDATE_GROUP = 'groups/PUT_UPDATE_GROUP'
const DELETE_GROUP = 'groups/DELETE_GROUP'

const POST_GROUP_NEW_EVENT = 'groups/POST_GROUP_NEW_EVENT';



const getGroupList = (groups) => {
    return {
        type: GET_GROUPLIST,
        groups
    }
}

const getGroupById = (group) => {
    return {
        type: GET_GROUP_BY_ID,
        group
    }
}

const postNewGroup = (group) => {
    return {
        type: POST_NEW_GROUP,
        group
    }
}

const putUpdateGroup = (group) => {
    return {
        type: PUT_UPDATE_GROUP,
        group
    }
}

const getGroupEvents = (events, groupId) => {
    return {
        type: GET_GROUP_EVENTS,
        events,
        groupId
    }
}

const postNewGroupEvent = (event) => {
    return {
        type: POST_GROUP_NEW_EVENT,
        event
    }
}

const getGroupMembers = (members, groupId) => {
    return {
        type: GET_GROUP_MEMBERS,
        members, 
        groupId
    }
}

const deleteGroup = (groupId) => {
    return {
        type: DELETE_GROUP,
        groupId
    }
}

export const getGroupListThunk = () => async dispatch => {
    const response = await fetch('/api/groups')
    if (response.ok) {
        const data = await response.json();
        dispatch(getGroupList(data));
        return data
    }
}

export const getGroupByIdThunk = (groupId) => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}`)
    if (response.ok) {
        const data = await response.json();
        
        dispatch(getGroupById(data));
        return data
    }
}

export const postNewGroupThunk = (group) => async dispatch => {
    const response = await csrfFetch('/api/groups/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    });

    console.log(response)
    if (response.ok) {
        
        const data = await response.json();
        dispatch(postNewGroup(data));
        return data;
    }
}

export const putUpdateGroupThunk = (newGroup, groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGroup)
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(putUpdateGroup(data));
        return data;
    }
}

export const getGroupEventThunk = (groupId) => async dispatch => {
    const response = await fetch(`/api/events/groups/${groupId}`);
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(getGroupEvents(data, groupId));
        return data;
    } else {
        if (response.status == 404){
            dispatch(getGroupEvents([], groupId));
            return [];
            
        }
    }
}

export const getGroupMembersThunk = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`);
    if (response.ok) {
        const data = await response.json();
        console.log('data', data)
        dispatch(getGroupMembers(data, groupId));
        return data;
    }
}

export const deleteGroupThunk = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteGroup(groupId));
        return response.ok;
    }
}



const initialState = {};

const groupsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_GROUPLIST:{
            newState = { ...state};
            action.groups.map(group => newState[group.id] = group)
            newState = { ...newState }
            return newState
        }
        case GET_GROUP_BY_ID: {
            newState = {};
            newState[action.group.id] = action.group
            return newState;
        }
        case POST_NEW_GROUP: {
            newState = { ...state };
            newState[action.group.id] = action.group;
            return newState;
        }
        case PUT_UPDATE_GROUP: {
            newState = { ...state };
            // newState[action.groupId] = { ...newState[action.groupId], events: action.events };
            newState[action.group.id] = { ...newState[action.group.id], ...action.group };
            // newState[action.group.id] = action.group
            return newState
        }
        case GET_GROUP_EVENTS: {
            newState = { ...state };
            newState[action.groupId] = { ...newState[action.groupId], events: action.events };
            return newState
        }
        case GET_GROUP_MEMBERS: {
            newState = { ...state };
            const members = {};
            action.members.forEach(member => members[member.id] = member);
            if (![state[action.groupId].events]){
                console.log('!', state[action.groupId].events)
                newState[action.groupId] = { ...newState[action.groupId], events: [...state[action.groupId].events], members }
            } else {
                newState[action.groupId] = { ...newState[action.groupId], members }
            }
            return newState;
        }
        case DELETE_GROUP: {
            newState = { ...state };
            delete newState[action.groupId];
            return newState;
        }
        default: {
            return state
        }

    }
};

export default groupsReducer;

