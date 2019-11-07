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
        console.log(error)
    })
}

export const getRandomObj = () => {
    console.log(`in getRandomObj`)
    const artworkArray = localStorage.getItem("objectIdArray").split(',')

    const objectId = artworkArray[[Math.floor(Math.random()*artworkArray.length)]];

    return objectId
}

// API call to get single art object
export const startFetchArt = () => dispatch =>{
    console.log(["[ArtworkActions] startFetchArt"])

    // select random object from OBJECT ID array
    let randomId = getRandomObj();

    //Got the RandomId
    console.log(`RANDOMID: ${randomId}`)

    // Call the Object API with RandomId
    axios.get(`/objects/${randomId}`)
    .then(response => {
            console.log(`in response of ObjectAPIcall`)
            dispatch(setArt(response.data))
        }
    ).catch(error => {
        dispatch(fetchArtFail(error))
        console.log(error)
    })    
}


// const set art state, artwork is an art object

export const setArt = (artwork) => dispatch => {
    
    if (artwork.primaryImage === "" || artwork.primaryImage === null ) {
        console.log(`[InSetArt] NO IMAGE`)
        dispatch(startFetchArt());
    } else {
        console.log(`[ARTWORK ACTIONS] setArt`)
        return dispatch({ 
            type: actionTypes.SET_ART, 
            artwork: {
                title: artwork.title, 
                artistDisplayName: artwork.artistDisplayName, 
                medium: artwork.medium, 
                objectId: artwork.objectID, 
                primaryImage: artwork.primaryImage, 
                primaryImageSmall: artwork.primaryImageSmall
            }
        })
    }
}

// if any APIfetch fails

export const fetchArtFail = (error) => {
    return {
        type: actionTypes.FETCH_ART_FAIL, 
        error: error
    }
}
