import axios from 'axios';
import * as actionTypes from './actionTypes'

export const addGallery = ( artwork ) => {
    console.log(`IN GALLERY AXNS: ADD GALLERY`)
    return {
        type: actionTypes.ADD_GALLERY, 
        title: artwork.title, 
        artistDisplayName: artwork.artist, 
        medium: artwork.medium, 
        objectId: artwork.objectId, 
        primaryImage: artwork.primaryImage, 
        primaryImage: artwork.primaryImageSmall
    }
}

export const removeGallery = ( artworkId ) => {
    return {
        type: actionTypes.REMOVE_GALLERY, 
        objectId: artworkId
    }
}

export const startFetchgallery = () => {
    return {
        type: actionTypes.START_FETCH_GALLERY
    }
}

export const fetchGallery = () => {
    return {

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