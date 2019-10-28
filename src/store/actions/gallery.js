import axios from 'axios';
import * as actionTypes from './actionTypes'

export const startAddGallery = () => {
    return {
        type: actionTypes.START_ADD_GALLERY,
        loading: true
    }
}

export const addGallerySuccess = ( gallery ) => {
    return {
        type: actionTypes.ADD_GALLERY_SUCCESS,
        gallery: gallery, 
        loading: false
    }
}

export const addGalleryFailed = (error) => {
    return {
        type: actionTypes.ADD_GALLERY_FAILED, 
        error: error, 
        loading: false
    }
}

export const addGallery = ( artwork, token) => {
    console.log(`IN GALLERY AXNS: ADD GALLERY`)
    return dispatch => {
        startAddGallery();
        axios.post(`https://letsmet-43e41.firebaseio.com/gallery.json?auth=${token}`, artwork)
        .then(response => {
            dispatch(addGallerySuccess( response.data.gallery))
            dispatch(fetchGallery(token))
        })
        .catch(error => {
            dispatch(addGalleryFailed(error))
        })        
    }
}

export const removeGallery = ( artwork, token ) => {
    console.log('IN GALLERY AXNS: REMOVE GALLERY')
    return dispatch => { 
        startRemoveGallery(); 
        
        axios.delete(`https://letsmet-43e41.firebaseio.com/gallery.json?auth=${token}`, artwork)
        .then(response => {
            console.log('what is remove gallery response?')
            console.log(response.data.gallery)
            dispatch(removeGallerySuccess())
        })
        .catch(err => {
            console.log(err)
            dispatch(removeGalleryFailed(err))
        })
    }
}

export const startRemoveGallery = ( ) => {
    return {
        type: actionTypes.START_REMOVE_GALLERY, 
        loading: true
    }
}

export const removeGalleryFailed = ( error ) => {
    return {
        type: actionTypes.REMOVE_GALLERY_FAILED, 
        error: error
    }
}

export const removeGallerySuccess = () => {
    return {
        type: actionTypes.REMOVE_GALLERY_SUCCESS,
        loading: false
    }
}

// export const removeGallery = ( artworkId ) => {
//     return {
//         type: actionTypes.REMOVE_GALLERY, 
//         objectId: artworkId
//     }
// }

export const startFetchGallery = () => {
    return {
        type: actionTypes.START_FETCH_GALLERY
    }
}

export const fetchGallery = (token, userId) => {
    return dispatch => {
        dispatch(startFetchGallery());

        const queryParams = '?auth=' + token + '&galleryBy="userId"&equalTo"' + userId + '"';

        axios.get('https://letsmet-43e41.firebaseio.com/gallery.json' + queryParams )
        .then( response => {
            const fetchedGallery = [];

            Object.values(response.data).map (
                art => 
                    fetchedGallery.push(art)
            )
            const lastArtwork = {
                ...fetchedGallery[fetchedGallery.length - 1]
            }

            dispatch(fetchGallerySuccess(fetchedGallery, lastArtwork))

        })
        .catch(err => {
            console.log('Error Fetching Gallery:')
            dispatch(fetchGalleryFail(err.response))
        })
    }
}


export const fetchGallerySuccess = ( gallery, lastArtwork ) => {
    return {
        type: actionTypes.FETCH_GALLERY_SUCCESS,
        gallery: gallery, 
        lastArtwork: lastArtwork
    }
}

export const fetchGalleryFail = (error) => {
    return {
        type: actionTypes.FETCH_GALLERY_FAIL, 
        error: error
    }
}