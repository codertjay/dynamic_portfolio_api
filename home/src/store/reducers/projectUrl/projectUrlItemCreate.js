import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    projectUrlItemCreate: null,
    error: null,
    loading: false
}

const projectUrlCreateStart = (state, action) => {
    return updateObject(state, {
        projectUrlItemCreate: null,
        error: null,
        loading: true
    });
}

const projectUrlCreateSuccess = (state, action) => {
    return updateObject(state, {
        projectUrlItemCreate: action.projectUrlItemCreate,
        error: null,
        loading: false
    });
}

const projectUrlCreateFail = (state, action) => {
    return updateObject(state, {
        ...state,
        error: action.error,
        loading: false
    });
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.PROJECTURL_ITEM_CREATE_START: return projectUrlCreateStart(state, action);
        case actionTypes.PROJECTURL_ITEM_CREATE_SUCCESS: return projectUrlCreateSuccess(state, action);
        case actionTypes.PROJECTURL_ITEM_CREATE_FAIL: return projectUrlCreateFail(state, action);
        default:
            return state;
    }
}

export default reducer;