import axios from 'axios';
import * as actionTypes from './actionTypes'

export const startAddGallery = () => {
    return {
        type: actionTypes.START_ADD_GALLERY,
        loading: true
    }
}

export const addGallerySuccess = ( artwork ) => {
    return {
        type: actionTypes.ADD_GALLERY_SUCCESS,
        artwork: artwork,
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

export const addGallery = ( token, userId, artwork) => {
    console.log(`https://letsmet-43e41.firebaseio.com/users/${userId}/gallery.json?auth=${token}`)
    
    return dispatch => {
        startAddGallery();
        axios.post(`https://letsmet-43e41.firebaseio.com/users/${userId}/gallery.json?auth=${token}`, artwork)
        .then(response => {
            dispatch(addGallerySuccess({
                    dataId: response.data.name, 
                    ...artwork
                }))
                
            dispatch(fetchGallery(token, userId))
        })
        .catch(error => {
            console.log(`AddGalleryFailError: ${JSON.stringify(error)}`)

            dispatch(addGalleryFailed(error))
        })        
    }
};

export const removeGallery = ( token, userId, artwork) => {
    console.log(`removeGallery.js: dataId: ${artwork.dataId}`)
    
    return dispatch => { 
        startRemoveGallery(); 
        axios.delete(`https://letsmet-43e41.firebaseio.com/users/${userId}/gallery/${artwork.dataId}.json?auth=${token}`)
        .then(response => {
            dispatch(removeGallerySuccess(artwork))
            dispatch(fetchGallery(token, userId))
        })
        .catch(err => {
            console.log(err)
            dispatch(removeGalleryFailed(err))
        })
    }
};

export const startRemoveGallery = ( ) => {
    return {
        type: actionTypes.START_REMOVE_GALLERY, 
        loading: true
    }
};

export const removeGalleryFailed = ( error ) => {
    return {
        type: actionTypes.REMOVE_GALLERY_FAILED, 
        error: error
    }
};

export const removeGallerySuccess = ( artwork ) => {
    return {
        type: actionTypes.REMOVE_GALLERY_SUCCESS,
        artwork: artwork,
        loading: false
    }
};


export const startFetchGallery = () => {
    return {
        type: actionTypes.START_FETCH_GALLERY
    }
};

export const fetchGalleryFailed = (error) => {
    return {
        type: actionTypes.FETCH_GALLERY_FAILED,
        error: error
    }
}

export const fetchGallery = (token, userId) => {
    console.log(`fetchGallery AXN: userId: ${userId}`)
    return dispatch => {
        dispatch(startFetchGallery());

        // const queryParams =  ``
        axios.get(`https://letsmet-43e41.firebaseio.com/users/${userId}/gallery.json?auth=${token}` )
        .then( response => {
            dispatch(fetchGallerySuccess(response.data))
        })
        .catch(error => {
            console.log(`Error Fetching Gallery:${error}`)
            dispatch(fetchGalleryFailed(error))
        })
    }
};


export const fetchGallerySuccess = ( fetchGalleryResponse ) => {
    let fetchedGallery = [];
    let emptyGallery = null

    if (fetchGalleryResponse.length === 0 ) {
        emptyGallery = true
    } else {
        emptyGallery = false

        Object.entries(fetchGalleryResponse).map(
            art => 
                fetchedGallery.push({
                    dataId: art[0],
                    title: art[1].title, 
                    artistDisplayName: art[1].artistDisplayName, 
                    medium: art[1].medium, 
                    primaryImage: art[1].primaryImage, 
                    primaryImageSmall: art[1].primaryImageSmall,
                    objectId: art[1].objectId
                })    
        )
    }

    return {
        type: actionTypes.FETCH_GALLERY_SUCCESS,
        gallery: fetchedGallery, 
        emptyGallery: emptyGallery
    }
};
