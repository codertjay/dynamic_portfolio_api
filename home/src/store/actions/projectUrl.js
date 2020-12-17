import axios from 'axios';
import * as actionTypes from './actionTypes';

export const projectUrlStart = () => {
    return {
        type: actionTypes.PROJECTURL_START,
        loading: true,
        projectUrl: null
    }
}

export const projectUrlSuccess = projectUrl => {
    return {
        type: actionTypes.PROJECTURL_SUCCESS,
        loading: false,
        projectUrl: projectUrl
    }
}

export const projectUrlFail = err => {
    return {
        type: actionTypes.PROJECTURL_FAIL,
        error: err,
        loading: false,
    }
}


const projectUrlAnonymous = (username) => {
    console.log('user list  being called')
    return dispatch => {
        dispatch(projectUrlStart());
        console.log('projectUrlAnonymous start')
        axios.defaults.headers = {
            "Content-Type": "application/json",

        };
        if (username !== null && username !== undefined) {
            console.log(username)
            axios.get(`http://127.0.0.1:8000/projecturl/projecturl_anonymous/?username=${username}`)
                .then(res => {
                    const projectUrl = res.data
                    dispatch(projectUrlSuccess(projectUrl));
                })
                .catch(err => {
                    console.error(err)
                    console.log('there was an error')
                    dispatch(projectUrlFail(err))
                })
        }

    }
}

export default projectUrlAnonymous