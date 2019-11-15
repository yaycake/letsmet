import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    artwork: {
        title: null, 
        artistDisplayName: null, 
        medium: null, 
        objectDate: null,
        objectId: null, 
        objectUrl: null,
        primaryImage: null, 
        primaryImageSmall: null, 
    }, 
    error: null, 
    loading: false, 
    previousObjectId: null
};



const startFetchArt = ( state, action ) => {
    return updateObject( state, {
        error: null, 
        loading: true
    })
}

const fetchArtFail = (state,action)=> {
    return updateObject(state, {
        error: true
    })
}

const fetchArtSuccess = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false,
        artwork: {
            title: action.artwork.title, 
            artistDisplayName: action.artwork.artistDisplayName,
            medium: action.artwork.medium, 
            objectId: action.artwork.objectId,
            primaryImage: action.artwork.primaryImage, 
            primaryImageSmall: action.artwork.primaryImageSmall
        },
    })
}

const setPreviousArtwork = (state, action) =>{
    return updateObject (state, {
        previousObjectId: action.previousObjectId
    })
}

const startFetchPreviousArt = (state, action) => {
    return updateObject (state, {
        loading: true, 
        error: null
    })
}

const fetchPreviousArtSuccess = (state, action) => {
    return updateObject (state, {
        error: null, 
        loading: false,
        artwork: {
            title: action.artwork.title, 
            artistDisplayName: action.artwork.artistDisplayName,
            medium: action.artwork.medium, 
            objectId: action.artwork.objectId,
            primaryImage: action.artwork.primaryImage, 
            primaryImageSmall: action.artwork.primaryImageSmall
        },
    })
}

const fetchPreviousArtFailed = (state, action) => {
    return updateObject (state, {
        loading: false, 
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
       
        case actionTypes.SET_PREVIOUS_ARTWORK:
            return setPreviousArtwork(state, action)
        case actionTypes.START_FETCH_PREVIOUS_ART:
            return startFetchPreviousArt(state, action)
        case actionTypes.FETCH_PREVIOUS_ART_SUCCESS:
            return fetchPreviousArtSuccess(state, action)
        case actionTypes.FETCH_PREVIOUS_ART_FAILED:
                return fetchPreviousArtFailed(state, action)

        case actionTypes.START_FETCH_ART: 
            return startFetchArt(state, action)
        case actionTypes.FETCH_ART_SUCCESS: 
            return fetchArtSuccess(state, action)
        case actionTypes.FETCH_ART_FAIL:
            return fetchArtFail(state, action)
        default:
            return state
    }
}

export default reducer;