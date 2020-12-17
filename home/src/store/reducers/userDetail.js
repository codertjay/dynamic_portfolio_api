import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    user_detail: {},
    username: null,
    last_name: null,
    email: null,
    user_type: null,
    error: null,
    loading: null,
    profile_pics: null,
    background_image: null,
    skills: null,
    phone_number: null,
    linkedin: null,
    twitter: null,
    instagram: null,
    about: null,
    logo: null,

    error: null,
    loading: false

}

const usersDetailStart = (state, action) => {
    return updateObject(state, {
        user_detail: null,
        username: null,
        error: null,
        loading: true
    });
}
const usersDetailSuccess = (state, action) => {
    return updateObject(state, {
        user_detail: action.user_detail,
        username: action.user_detail.username,
        last_name: action.user_detail.last_name,
        email: action.user_detail.email,
        user_type: action.user_detail.user_type,
        error: null,
        loading: false,

        profile_pics: action.user_detail.profile.profile_pics,
        background_image: action.user_detail.profile.background_image,
        skills: action.user_detail.profile.skills,
        phone_number: action.user_detail.profile.phone_number,
        linkedin: action.user_detail.profile.linkedin,
        twitter: action.user_detail.profile.twitter,
        instagram: action.user_detail.profile.instagram,
        about: action.user_detail.profile.about,
        logo: action.user_detail.profile.logo,
    });
}

const usersDetailFail = (state, action) => {
    return updateObject(state, {
        ...state,
        error: action.error,
        loading: false
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERDETAIL_START: return usersDetailStart(state, action);
        case actionTypes.USERDETAIL_SUCCESS: return usersDetailSuccess(state, action);
        case actionTypes.USERDETAIL_FAIL: return usersDetailFail(state, action);
        default:
            return state;
    }
}

export default reducer;