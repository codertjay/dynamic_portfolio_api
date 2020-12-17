import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    users: null,
    error: null,
    loading: false
}

const usersListStart = (state, action) => {
    return updateObject(state, {
        users: null,
        error: null,
        loading: true
    });
}

const usersListSuccess = (state, action) => {
    return updateObject(state, {
        users: action.user,
        error: null,
        loading: false
    });
}

const usersListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.USERLIST_START: return usersListStart(state, action);
        case actionTypes.USERLIST_SUCCESS: return usersListSuccess(state, action);
        case actionTypes.USERLIST_FAIL: return usersListFail(state, action);
        default:
            return state;
    }
}

export default reducer;