import * as actionTypes from './actionTypes';
import axios from '../../axios-art';


// API call to get all the object codes & store them in local storage

export const initArtObjects = () => {
    console.log(`[Artwork Actions] INIT artobjects`)
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

    console.log(["[ArtworkActions] startFetchArt"])

    const artworkArray = localStorage.getItem("objectIdArray").split(',')

    console.log(`[ArtworkActions] ${artworkArray}`)

    const objectId = artworkArray[[Math.floor(Math.random()*artworkArray.length)]];

    // console.log(`[objectId] ${objectId}`)

    return dispatch => {
        axios.get(`/objects/${objectId}`).then(
            response => {dispatch(setArt(response.data))
            }
        ).catch(error => {dispatch(fetchArtFail())
        })
    }
}

// const set art state, artwork is an art object

export const setArt = (artwork) => {
    console.log(`[ARTWORK ACTIONS] setArt`)
    return { 
        type: actionTypes.SET_ART, 
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

export const fetchArtFail = () => {
    return {
        type: actionTypes.FETCH_ART_FAIL
    }
}
