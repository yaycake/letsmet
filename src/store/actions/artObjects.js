import * as actionTypes from './actionTypes';
import axios from '../../axios-art';

export const startInitObjects = () => {
    return {
        type: actionTypes.START_INIT_OBJECTS
    }
}

export const initObjectsFailed = ( error ) => {
    return {
        type: actionTypes.INIT_OBJECTS_FAILED,
        error: error
    }
}

export const initObjectsSuccess = ( artObjectsArray ) => {
    return {
        type: actionTypes.INIT_OBJECTS_SUCCESS, 
        artObjects: artObjectsArray
    }
}

export const initArtObjects = () => {
    return dispatch => {
        dispatch(startInitObjects());
        axios.get('/objects')
        .then(response => {
            dispatch(initObjectsSuccess(response.data.objectIDs))
        })
        .catch(error => {
            console.log(error)
            dispatch(initObjectsFailed(error))
        })
    }
}