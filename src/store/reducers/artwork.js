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
    error: null, 
    loading: false
};


const startInitObjects = (state, action) => {
    return updateObject( state, {
        loading: false, 
    })
}

const initObjectsSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false
    })
}

const initObjectsFailed = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
}

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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.START_INIT_OBJECTS: 
            return startInitObjects(state, action)
        case actionTypes.INIT_OBJECTS_SUCCESS:
            return initObjectsSuccess(state, action)
        case actionTypes.INIT_OBJECTS_FAILED:
            return initObjectsFailed(state, action)

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