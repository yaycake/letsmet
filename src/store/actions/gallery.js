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

export const addGallery = ( token, artwork ) => {
    console.log(`IN GALLERY AXNS: ADD GALLERY`)
    return dispatch => {
        startAddGallery();
        axios.post(`https://letsmet-43e41.firebaseio.com/gallery.json?auth=${token}`, artwork)
        .then(response => {
            dispatch(addGallerySuccess(artwork))
        })
        .catch(error => {
            console.log(`AddGalleryFailError: ${error}`)
            dispatch(addGalleryFailed(error))
        })        
    }
}

export const removeGallery = ( token, artwork) => {
    console.log('IN GALLERY AXNS: REMOVE GALLERY')

    console.log(`artwork.objectId: ${artwork.objectId}`)
    return dispatch => { 
        startRemoveGallery(); 
        
        axios.get(`https://letsmet-43e41.firebaseio.com/gallery.json?auth=${token}&orderBy="objectId"&equalTo="${artwork.objectId}"`)
        .then( response => {
            console.log(`got the artnode: ${response.data}`)
            
        })
        .catch(error => {
            console.log(`removeGallery error: ${error}`)
            dispatch(removeGalleryFailed(error))
        })

        // axios.delete(`https://letsmet-43e41.firebaseio.com/gallery.json?auth=${token}&orderBy="objectId"&equalTo=${artwork.objectId}`, artwork)
        // axios.delete(artNode)
        // .then(response => {
        //     console.log('in removeGallery axn')
        //     dispatch(removeGallerySuccess(artwork))
        // })
        // .catch(err => {
        //     console.log(err)
        //     dispatch(removeGalleryFailed(err))
        // })
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

export const removeGallerySuccess = ( artwork ) => {
    return {
        type: actionTypes.REMOVE_GALLERY_SUCCESS,
        artwork: artwork,
        loading: false
    }
}


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

            console.log(`fetchedGallery response: ${JSON.stringify(response.data)}`)

            console.log(`galleryTypeof ${typeof response.data}`)

            const fetchedGallery = [];

            // Object.values(response.data).map (
            //     art =>  
            //         // fetchedGallery.push(art)
            // )

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
            console.log('Error Fetching Gallery:')
            console.log(`Error Fetching Gallery:${err}`)
            dispatch(fetchGalleryFail(err))
        })
    }
}


export const fetchGallerySuccess = ( gallery ) => {
    return {
        type: actionTypes.FETCH_GALLERY_SUCCESS,
        gallery: gallery, 
        // lastArtwork: lastArtwork
    }
}

export const fetchGalleryFail = (error) => {
    return {
        type: actionTypes.FETCH_GALLERY_FAIL, 
        error: error
    }
}