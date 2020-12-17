import axios from 'axios';
import * as actionTypes from './actionTypes';

export const userListStart = () => {
    return {
        type: actionTypes.USERLIST_START
    }
}

export const userListSuccess = user => {
    return {
        type: actionTypes.USERLIST_SUCCESS ,
        user
    }
}

export const userListFail = err => {
    return {
        type: actionTypes.USERLIST_FAIL ,
        error: err
    }
}


export const usersList = () => {
    return dispatch => {
        dispatch (userListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json" ,
        };
        axios.get ('http://127.0.0.1:8000/users/')
            .then (res => {
                const user = {
                    user: res.data
                }
                dispatch (userListSuccess(user));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (userListFail(err))
            })
    }
}
