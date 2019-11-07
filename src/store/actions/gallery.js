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

export const fetchGallery = (token, userId) => {
    console.log(`fetchGallery AXN: userId: ${userId}`)
    return dispatch => {
        dispatch(startFetchGallery());

        const queryParams =  `?auth=${token}`
    
        console.log(`FetchGalleryAXN URL: https://letsmet-43e41.firebaseio.com/users/${userId}/gallery.json${queryParams}`)

        axios.get(`https://letsmet-43e41.firebaseio.com/users/${userId}/gallery.json${queryParams}` )
        .then( response => {

            console.log(`inFetchGalleryActions`)

            console.log(`inFetchGalleryActions: response ${JSON.stringify(response)}`)

            const fetchedGallery = [];

            Object.entries(response.data).map(
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
            dispatch(fetchGallerySuccess(fetchedGallery))
        })
        .catch(err => {
            console.log(`Error Fetching Gallery:${err}`)
            dispatch(fetchGalleryFail(err))
        })
    }
};


export const fetchGallerySuccess = ( gallery ) => {
    return {
        type: actionTypes.FETCH_GALLERY_SUCCESS,
        gallery: gallery
    }
};

export const fetchGalleryFail = (error) => {
    return {
        type: actionTypes.FETCH_GALLERY_FAIL, 
        error: error
    }
};