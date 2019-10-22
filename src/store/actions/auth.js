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

export const auth = (email, password, isSignup ) => {
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
        // const apiKey = process.env.AUTH_API_KEY

        const apiKey = 'AIzaSyADeOJD-zT2jntAdDpY2ebcD8LllNUTSsE'

        let apiCall =`${baseUrl}${signInUrl}${apiKey}`; 

        if (isSignup){
            apiCall = `${baseUrl}${signUpUrl}${apiKey}`
        }

        axios.post(apiCall, authData)
        .then( response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error))
        })
    }
}