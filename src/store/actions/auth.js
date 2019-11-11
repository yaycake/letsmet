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

export const startPullUserInfo = () => {
    return {
        type: actionTypes.START_PULL_USER_INFO
    }
}

export const pullUserInfoSuccess = ( username ) => {
    return {
        type: actionTypes.PULL_USER_INFO_SUCCESS,
        username: username
    }
}
export const pullUserInfoFailed = ( error ) => {
    return {
        type: actionTypes.PULL_USER_INFO_FAILED, 
        error: error
    }
}

const pullUserInfo = ( token, userId ) => {
    return dispatch => {

        dispatch(startPullUserInfo());

        axios.get(`https://letsmet-43e41.firebaseio.com/users/${userId}/username.json?auth=${token}`)
        .then( response => {
            dispatch(pullUserInfoSuccess(response.data))
        }).catch(error => {
            dispatch(pullUserInfoFailed(error))
        })
    }
}

export const startSaveUsername = () => {
    return {
        type: actionTypes.START_SAVE_USERNAME
    }
}

export const saveUsernameFailed = (error) => {
    return {
        type: actionTypes.SAVE_USERNAME_FAILED, 
        error: error
    }
}

export const saveUsernameSuccess = ( username ) => {
    return {
        type: actionTypes.SAVE_USERNAME_SUCCESS, 
        username: username
    }
}

export const saveUsername = ( username, token, userId ) => {
    return dispatch =>{
        dispatch(startSaveUsername());
        axios.patch(`https://letsmet-43e41.firebaseio.com/users/${userId}.json?auth=${token}`, {username: username})
        .then( response => {
            dispatch(saveUsernameSuccess({
                ...username}))
            dispatch(pullUserInfo(token, userId))
        })
        .catch(error => {
            console.log(`saveUsernameFail: ${error}`)
            dispatch(saveUsernameFailed(error))
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
            console.log(`AUTH RESPONSE: ${JSON.stringify(response)}`);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            if (isSignup){
                dispatch(saveUsername(username, response.data.idToken, response.data.localId))
            } else {
                dispatch(pullUserInfo(response.data.idToken, response.data.localId))
            }
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            console.log(`POST ERROR: ${JSON.stringify(error)}`)
            dispatch(authFail(error))
        })
    }
}
