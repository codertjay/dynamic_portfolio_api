import axios from 'axios';
import * as actionTypes from './actionTypes';

export const userDetailStart = () => {
    return {
        type: actionTypes.USERDETAIL_START
    }
}

export const userDetailSuccess = user_detail => {
    return {
        type: actionTypes.USERDETAIL_SUCCESS ,
        user_detail
    }
}

export const userDetailFail = err => {
    return {
        type: actionTypes.USERDETAIL_FAIL ,
        error: err
    }
}


export const usersDetail = (username) => {
    return dispatch => {
        dispatch (userDetailStart ());
        axios.defaults.headers = {
            "Content-Type": "application/json" ,
        };
        axios.get (`http://127.0.0.1:8000/users/${username}/`)
            .then (res => {
                const user_detail = res.data
                dispatch (userDetailSuccess (user_detail));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (userDetailFail (err))
            })
    }
}
