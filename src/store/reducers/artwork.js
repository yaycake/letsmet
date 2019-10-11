import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    title: null, 
    artistDisplayName: null, 
    medium: null, 
    objectDate: null,
    objectId: null, 
    objectUrl: null,
    primaryImage: null, 
    primaryImageSmall: null
};

const fetchArt = (state, action) => {
   
}

const fetchArtFail = (state,action)=> {
    return updateObject(state, {
        error: true
    })
}

const setArt = (state, action) => {
    
    return updateObject(state, {
        artwork: {
            title: action.artwork.title, 
            artistDisplayName: action.artwork.artistDisplayName,
            medium: action.artwork.medium, 
            objectId: action.artwork.objectID,
            primaryImage: action.artwork.primaryImage, 
            primaryImageSmall: action.artwork.primaryImageSmall
        }
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