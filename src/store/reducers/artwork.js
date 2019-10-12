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
        primaryImageSmall: null
    }, 
    error: null
};

const fetchArt = (state, action) => {
 
}

const fetchArtFail = (state,action)=> {
    return updateObject(state, {
        error: true
    })
}

const setArt = (state, action) => {
    console.log(`[ARTWORK REDUCER] setArt`)
    
    return updateObject(state, {
        artwork: {
            title: action.artwork.title, 
            artistDisplayName: action.artwork.artistDisplayName,
            medium: action.artwork.medium, 
            objectId: action.artwork.objectId,
            primaryImage: action.artwork.primaryImage, 
            primaryImageSmall: action.artwork.primaryImageSmall
        },
        error: null
    })
    
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_ART: 
            return setArt(state, action)
        case actionTypes.FETCH_ART_FAIL:
            return fetchArtFail(state, action)
        default:
            return state
    }
}

export default reducer;