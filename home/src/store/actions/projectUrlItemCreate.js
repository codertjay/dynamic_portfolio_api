import axios from 'axios';
import * as actionTypes from './actionTypes';

export const projectUrlItemCreateStart = () => {
    return {
        type: actionTypes.PROJECTURL_CREATE_START,
        loading: true
    }
}

export const projectUrlItemCreateSuccess = projectUrl => {
    return {
        type: actionTypes.PROJECTURL_CREATE_SUCCESS ,
         loading: false,
        projectUrl
    }
}

export const projectUrlItemCreateFail = err => {
    return {
        type: actionTypes.PROJECTURL_CREATE_FAIL ,
        error: err,
        loading:false,
    }
}


export const projectUrlCreate = (projectUrlId, name) => {
    return dispatch => {
        dispatch (projectUrlItemCreateStart ());
        console.log ('project url create being called')
        axios.defaults.headers = {
            "Content-Type": "application/json" ,

        };
        console.log ('the projecturl item ',name)
        axios.post(`http://127.0.0.1:8000/projectUrl/projecturl_item_create/`,  {
            id: projectUrlId,
            name: name,

        })
            .then (res => {
                console.log ('project url create ' , res.data)
                const projectUrlCreate = res.data
                dispatch (projectUrlItemCreateSuccess(projectUrlCreate));
            })
            .catch (err => {
                console.error (err)
                dispatch (projectUrlItemCreateFail(err))
            })
    }
}
