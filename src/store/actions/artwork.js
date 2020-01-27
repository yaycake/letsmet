import * as actionTypes from './actionTypes';
import axios from '../../axios-art';
import artObjects from '../../artObjects.json'

// API call to get all the object codes & store them in local storage


export const getRandomObj = ( ) => {
    let artArray = artObjects["artObjects"]
    const objectId = artArray[[Math.floor(Math.random()*artArray.length)]];
    return objectId
}

// API call to get single art object
export const startFetchArt = () => dispatch =>{
    return {
        type: actionTypes.START_FETCH_ART, 
    }
}

export const fetchArt = () => {
    return (dispatch, getState) => {
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

export const setPreviousArtwork = (objectId) => {
    return {
        type: actionTypes.SET_PREVIOUS_ARTWORK, 
        previousObjectId: objectId 
    }
}

export const fetchPreviousArt = (objectId) => {
    console.log(`in fetchPreviousArt`)
    return dispatch => {
        dispatch(startFetchPreviousArt());
        axios.get(`/objects/${objectId}`)
        .then(response => {
            dispatch(fetchArtSuccess(response.data))
        }).catch(error => {
            console.log(error)
            dispatch(fetchPreviousArtFailed)
        })
    }
}

export const startFetchPreviousArt = () => {
    return {
        type: actionTypes.START_FETCH_PREVIOUS_ART
    }
}

export const fetchPreviousArtFailed= ( error ) => {
    return {
        type: actionTypes.FETCH_PREVIOUS_ART_FAILED, 
        error: error
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
    console.log(`FetchArtFail: ${error}`)
    return {
        type: actionTypes.FETCH_ART_FAIL, 
        error: error
    }
}
