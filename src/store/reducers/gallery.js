import * as actionTypes from '../actions/actionTypes'; 
import { updateObject } from '../../shared/utility'

import { startRemoveGallery, removeGalleryFailed, removeGallerySuccess } from '../actions/gallery';

const initialState = {
    gallery: [], 
    error: null, 
    loading: false
}


const startFetchGallery = ( state, action ) => {
    return updateObject(state, {
        error: null, 
        loading: true
    })
}

const startAddGallery = ( state, action ) => {
    return updateObject(state, {
        error: null, 
        loading: true
    })
}

const addGallerySuccess = (state, action) => {
    const newArtwork = updateObject(
        {   ...action.artwork}
    )

    console.log(`addGallSuccess Reducer: newArtwork ${newArtwork}`)

    return updateObject(state, {
        gallery: state.gallery.concat(newArtwork),
        error: null, 
        loading: false, 
    })
}

const addGalleryFailed =  (state, action ) => {
    return updateObject(state, {
        error: action.error, 
        loading: false
    })
}

// const addGallery = (state, action ) => {
//     //currently only for add Artwork

//     console.log(`in Gallery Reducer: New artwork: ${action.artwork}`)
//     const newArtwork = action.artwork;

//     return updateObject(state, {
//         loading: false, 
//         gallery: state.gallery.push(newArtwork)
//     })
// }

const removeGallery = (state, action) => {
    return updateObject(state, {
        loading: false, 
        gallery: state.gallery.filter(art => 
            art.objectId !== action.objectId
        )
    })
}

const fetchGalleryFail = (state, action) => {
    return updateObject( state, {
        error: action.error, 
        loading: false
    })
}

const fetchGallerySuccess = (state, action) => {

    return updateObject( state, {
        gallery: action.gallery,
        // lastArtwork: action.lastArtwork,
        error: null, 
        loading: false
    })
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.START_FETCH_GALLERY: 
            return startFetchGallery(state,action)
        case actionTypes.FETCH_GALLERY_SUCCESS:
            return fetchGallerySuccess(state, action)
        case actionTypes.START_ADD_GALLERY:
            return startAddGallery(state,action)
        // case actionTypes.ADD_GALLERY: 
        //     return addGallery(state,action)
        case actionTypes.ADD_GALLERY_SUCCESS: 
            return addGallerySuccess(state, action)
        case actionTypes.ADD_GALLERY_FAILED: 
            return addGalleryFailed(state, action)

        case actionTypes.START_REMOVE_GALLERY:
            return startRemoveGallery(state, action)
        case actionTypes.REMOVE_GALLERY_FAILED: 
            return removeGalleryFailed(state, action)
        case actionTypes.REMOVE_GALLERY_SUCCESS:
            return removeGallerySuccess(state, action)
        case actionTypes.REMOVE_GALLERY:
            return removeGallery(state,action)
        case actionTypes.FETCH_GALLERY_SUCCESS:
            return fetchGallerySuccess(state,action)
        case actionTypes.FETCH_GALLERY_FAIL:
            return fetchGalleryFail(state,action)
        default: 
        return state
    }
}

export default reducer;