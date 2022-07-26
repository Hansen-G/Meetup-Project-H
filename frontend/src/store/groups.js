import { csrfFetch } from './csrf';

const GET_GROUPLIST = 'groups/GET_GROUPLIST'

const getGroupList = (groups) => {
    return {
        type: GET_GROUPLIST,
        groups
    }
}

export const getGroupListThunk = () => async dispatch => {
    const response = await fetch('/api/groups')
    if (response.ok) {
        const data = await response.json();
        console.log('!!!!!!!!!!!',data)
        dispatch(getGroupList(data));
        return data
    }
}

const initialState = {};

const groupsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_GROUPLIST:{
            newState = { ...state};
            console.log('HHHHHHere')
            action.groups.map(group => newState[group.id] = group)
            newState = { ...newState }

            console.log('newState', newState)
            return newState
        }
        default: {
            return state
        }

    }
};

export default groupsReducer;

