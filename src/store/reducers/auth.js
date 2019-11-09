import * as actionTypes from '../actions/actionTypes'; 
import { updateObject } from '../../shared/utility'


const initialState = {
    username: null,
    userId: null, 
    token: null, 
    error: null, 
    loading: false
}

const authStart = (state, action) => {
    return updateObject (state, { error: null, loading: true })
}

const authSuccess = (state, action ) => {
    console.log(`in authreducers: ${ action.userId}`)
    return updateObject ( state, { 
        username: action.username,
        token: action.idToken,
        userId: action.userId,
        error: null, 
        loading: false })
}

const authFail = (state, action ) => {
    return updateObject ( state, { error: action.error, loading: false })
}

const authLogout = (state, action ) => {
    return updateObject( state, {
        token: null, 
        userId: null, 
        username: null, 
    })
}

const startSaveUsername = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null,
    })
}

const saveUsernameSuccess = (state, action ) => {
    return updateObject(state, {
        username: action.username,
        loading: false, 
        error: null
    })
}

const saveUsernameFail = (state, action) => {
    return updateObject(state, {
        error: action.error, 
        loading: false
    })
}

const startPullUserInfo = ( state, action ) => {
    return updateObject(state, {
       loading: true
    })
}

const pullUserInfoSuccess = ( state, action ) => {

    console.log(`In pullUserInfoSuccess: ${JSON.stringify(action)}`)
    return updateObject(state, {
        username: action.username,
        error: null, 
        loading: false
    })
}

const pullUserInfoFailed = ( state, action ) => {
    return updateObject(state, {
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: 
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: 
            return authSuccess(state,action)
        case actionTypes.AUTH_FAIL: 
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout (state,action)

        case actionTypes.START_PULL_USER_INFO:
            return startPullUserInfo(state, action)
        case actionTypes.PULL_USER_INFO_FAILED: 
            return pullUserInfoFailed(state, action)
        case actionTypes.PULL_USER_INFO_SUCCESS:
            return pullUserInfoSuccess(state, action)
        
        case actionTypes.START_SAVE_USERNAME: 
            return startSaveUsername(state, action)
        case actionTypes.SAVE_USERNAME_SUCCESS: 
            return saveUsernameSuccess(state, action)
        case actionTypes.SAVE_USERNAME_FAILED: 
            return saveUsernameFail(state,action)
        default: 
            return state
    }
}

export default reducer;