import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    projectUrl: {},
    error: null,
    loading: false
}

const projectUrlStart = (state) => {
    return updateObject(state, {
        projectUrl:{},
        error: null,
        loading: true
    });
}

const projectUrlSuccess = (state, action) => {
    return updateObject(state, {
        projectUrl: action.projectUrl,
        error: null,
        loading: false
    });
}

const projectUrlFail = (state, action) => {
    return updateObject(state, {
        ...state,
        error: action.error,
        loading: false
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROJECTURL_START: return projectUrlStart(state, action);
        case actionTypes.PROJECTURL_SUCCESS: return projectUrlSuccess(state, action);
        case actionTypes.PROJECTURL_FAIL: return projectUrlFail(state, action);
        default:
            return state;
    }
}

export default reducer;