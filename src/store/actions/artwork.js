import * as actionTypes from './actionTypes';
import axios from '../../axios-art';


// API call to get all the object codes & store them in local storage

export const initArtObjects = () => {
    axios.get('/objects')
    .then(response => {
        localStorage.setItem('objectIdArray', response.data.objectIDs);
    })
    .catch(error => {
        console.log('Problem in action/artwork')
        console.log(error)
    })
}

// API call to get single art object
export const startFetchArt = () => {
    // select random object from OBJECT ID array

    const artworkArray = localStorage.getItem("objectIdArray")

    const objectId = [Math.floor(Math.random()*artworkArray.length)];

    axios.get(`/objects/${objectId}`)
        .then (response => {
            dispatch(setArt(response.data)
        )
        .catch(error => {
            dispatch(fetchArtFail())
        })
    })
}

// const set art state, artwork is an art object

export const setArt = (artwork) => {
    return { 
        type: actionTypes.SET_ART, 
        artwork: artwork
    }
}

// if any APIfetch fails

export const fetchArtFail = () => {
    return {
        type: actionTypes.FETCH_ART_FAIL
    }
}
