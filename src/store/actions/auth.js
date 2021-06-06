import * as actionTypes from '../actions/actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5u9JtqkasgkWsdtNhVFK9QlKautdX36g'
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5u9JtqkasgkWsdtNhVFK9QlKautdX36g '
        }
        axios.post(url, authData)
            .then((res) => {
                console.log(res.data)
                dispatch(authSuccess(res.data))
                dispatch(checkAuthTimeOut(res.data.expiresIn))
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error))
            })
    }
}
