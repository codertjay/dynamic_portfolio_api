import axios from 'axios';
import * as actionTypes from './actionTypes';

export const projectUrlCreateStart = () => {
    return {
        type: actionTypes.PROJECTURL_CREATE_START,
        loading: true
    }
}

export const projectUrlCreateSuccess = projectUrlCreate => {
    return {
        type: actionTypes.PROJECTURL_CREATE_SUCCESS ,
         loading: false,
        projectUrlCreate
    }
}

export const projectUrlCreateFail = err => {
    return {
        type: actionTypes.PROJECTURL_CREATE_FAIL ,
        error: err,
        loading:false,
    }
}


export const projectUrlCreate = (name) => {
    return dispatch => {
        dispatch (projectUrlCreateStart ());
        console.log ('project url create being called')
        axios.defaults.headers = {
            "Content-Type": "application/json" ,

        };
        console.log ('the projecturl name',name)
        axios.post(`http://127.0.0.1:8000/projectUrl/projecturl_create/`,  {
            name: name
        })
            .then (res => {
                console.log ('project url create ' , res.data)
                const projectUrlCreate = res.data
                dispatch (projectUrlCreateSuccess(projectUrlCreate));
            })
            .catch (err => {
                console.error (err)
                dispatch (projectUrlCreateFail(err))
            })
    }
}
