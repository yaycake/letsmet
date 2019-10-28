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

// const checkIfLiked = () => {
//     const matchedArt = userGallery.find(({art}) => art.objectId === objectId)

//     console.log(`matchedArt: ${matchedArt}`) 
//     if ( userGallery.find({art} => art.objectId === objectId)){
//         console.log('art is already in gallery!')
//         return true
//     } else {
//         console.log('New Art!')
//         return false
//     }
// }

// export const addGalleryDuplicate = (artwork, token, error ) => {
//     console.log('IN GALL AXNS: ADDGALLERYDUPLICATES')
//     return {
//         type: actionTypes.ADD_GALLERY_DUPLICATE, 
        
//     }
// }

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

        const queryParams = '?auth=' + token + '&galleryBy="userId"&equalTo"' + userId + '"';

        axios.get('https://letsmet-43e41.firebaseio.com/gallery.json' + queryParams )
        .then( response => {
            const fetchedGallery = [];

            Object.values(response.data).map (
                art => 
                    fetchedGallery.push(art)
            )

            const lastArtwork = {
                title: fetchedGallery[fetchedGallery.length - 1].title,
                artistDisplayName: fetchedGallery[fetchedGallery.length - 1].artistDisplayName,  
                medium: fetchedGallery[fetchedGallery.length - 1].medium,  
                objectId: fetchedGallery[fetchedGallery.length - 1].objectId,  
                primaryImage: fetchedGallery[fetchedGallery.length - 1].primaryImage,  
                primaryImageSmall: fetchedGallery[fetchedGallery.length - 1].primaryImageSmall
            }

            // console.log(`In GallActions: Last artworK.title: ${lastArtwork.title}`)

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