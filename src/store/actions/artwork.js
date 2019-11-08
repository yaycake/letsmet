import * as actionTypes from './actionTypes';
import axios from '../../axios-art';

// API call to get all the object codes & store them in local storage

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

export const initObjectsSuccess = ( ) => {
    return {
        type: actionTypes.INIT_OBJECTS_SUCCESS
    }
}

export const initArtObjects = () => {
    return dispatch => {
        dispatch(startInitObjects());
        axios.get('/objects')
        .then(response => {
            localStorage.setItem('objectIdArray', response.data.objectIDs);
            dispatch(initObjectsSuccess())
        })
        .catch(error => {
            console.log(error)
            dispatch(initObjectsFailed(error))
        })
    }
}

export const getRandomObj = () => {
    const artworkArray = localStorage.getItem("objectIdArray").split(',')
    const objectId = artworkArray[[Math.floor(Math.random()*artworkArray.length)]];
    return objectId
}

// API call to get single art object
export const startFetchArt = () => dispatch =>{
    return {
        type: actionTypes.START_FETCH_ART, 
    }
}

export const fetchArt = () => {
    return dispatch => {
        dispatch(startFetchArt());
        // select random object from OBJECT ID array
        let randomId = getRandomObj();
        // Call the Object API with RandomId
        axios.get(`/objects/${randomId}`)
        .then(response => {
            if (response.data.primaryImage === "" ||            response.data.primaryImage === null ) {
                dispatch(fetchArt());
            } else {
                dispatch(fetchArtSuccess(response.data))
            }
        }).catch(error => {
            console.log(error)
            dispatch(fetchArtFail(error))
        })    
    }
}

// const set art state, artwork is an art object

export const fetchArtSuccess = (artwork) => {
    return { 
        type: actionTypes.FETCH_ART_SUCCESS, 
        artwork: {
            title: artwork.title, 
            artistDisplayName: artwork.artistDisplayName, 
            medium: artwork.medium, 
            objectId: artwork.objectID, 
            primaryImage: artwork.primaryImage, 
            primaryImageSmall: artwork.primaryImageSmall
        }
    }
}

// if any APIfetch fails
export const fetchArtFail = (error) => {
    return {
        type: actionTypes.FETCH_ART_FAIL, 
        error: error
    }
}
