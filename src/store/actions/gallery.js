import axios from 'axios';
import * as actionTypes from './actionTypes'


export const startAddGallery = () => {
    return {
        type: actionTypes.START_ADD_GALLERY,
    }
}

export const addGallerySuccess = ( gallery ) => {
    return {
        type: actionTypes.ADD_GALLERY_SUCCESS,
        gallery: gallery
    }
}



export const addGallery = ( artwork, token) => {
    console.log(`IN GALLERY AXNS: ADD GALLERY`)
    return dispatch => {
        startAddGallery();
        
        axios.post(`https://letsmet-43e41.firebaseio.com/gallery.json?auth=${token}`, artwork)
        .then(response => {
            dispatch(addGallerySuccess( response.data.gallery))
        })
        .catch(error => {
            dispatch(addGalleryFailed(error))
        })
        
    }
}

export const addGalleryFailed = (error) => {
    return {
        type: actionTypes.ADD_GALLERY_FAILED, 
        error: error
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

        const queryParams = '?auth=' + token + 'galleryBy="userId&equalTo"' + userId+'"';

        axios.get('https://letsmet-43e41.firebaseio.com/' + queryParams )
        .then( response => {
            const fetchedGallery = [];

            for (let key in response.data ) {
                fetchedGallery.push({
                    ...response.data[key],
                    id: key
                })
            }

            dispatch(fetchGallerySuccess(fetchedGallery))

        })
        .catch(err => {
            console.log('error fetching gallery')
            dispatch(fetchGalleryFail(err.response.data.error))
        })
    }
}


export const fetchGallerySuccess = ( myGallery ) => {
    return {
        type: actionTypes.FETCH_GALLERY_SUCCESS,
        gallery: myGallery
    }
}

export const fetchGalleryFail = (error) => {
    return {
        type: actionTypes.FETCH_GALLERY_FAIL, 
        error: error
    }
}