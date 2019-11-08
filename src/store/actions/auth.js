import * as actionTypes from './actionTypes';
import axios from 'axios' 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        idToken: token, 
        userId: userId
    }
}

export const authFail = ( error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000 )
    }
}

const startSaveUsername = () => {
    return {
        type: actionTypes.START_SAVE_USERNAME
    }
}

const saveUsernameFail = (error) => {
    return {
        type: actionTypes.SAVE_USERNAME_FAIL, 
        error: error
    }
}

const saveUsernameSuccess = ( username ) => {
    return {
        type: actionTypes.SAVE_USERNAME_SUCCESS, 
        username: username
    }
}

export const saveUsername = ( username, token, userId ) => {
    return dispatch =>{
        dispatch(startSaveUsername());
        axios.put(`https://letsmet-43e41.firebaseio.com/users/${userId}.json?auth=${token}`, {username: username})
        .then( response => {
            dispatch(saveUsernameSuccess({
                ...username}))
        })
        .catch(error => {
            console.log(`saveUsernameFail: ${error}`)
            dispatch(saveUsernameFail(error))
        })
    }
}

export const auth = (username, email, password, isSignup ) => {
    return dispatch => {

        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:'

        const signInUrl = 'signInWithPassword?key='
        const signUpUrl = 'signUp?key='

        const apiKey = 'AIzaSyADeOJD-zT2jntAdDpY2ebcD8LllNUTSsE'

        let apiCall =`${baseUrl}${signInUrl}${apiKey}`; 

        if (isSignup){
            apiCall = `${baseUrl}${signUpUrl}${apiKey}`
        }

        axios.post(apiCall, authData)
        .then( response => {
            console.log(`AUTH RESPONSE: ${response}`);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            if (isSignup){
                dispatch(saveUsername(username, response.data.idToken, response.data.localId))
            }
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            console.log(`POST ERROR:`)
            console.log(error);
            dispatch(authFail(error))
        })
    }
}
