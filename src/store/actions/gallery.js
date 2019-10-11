import * as actionTypes from './actionTypes';
import axios from 'axios';


export const addGallery = (id) => {
    return {
        type: actionTypes.ADD_GALLERY, 
        artId: id
    }
};

export const removeGallery = (id) => {
    return {
        type: actionTypes.ADD_GALLERY, 
        artId: id
    }
}

export const fetchGallery = (token) => {
    return dispatch => {
        fetchGalleryStart();
        axios.get(_BASEURL_)
        .then(response => {
            dispatch(fetchGallerySuccess(response.data, galleryList))
        }).catch(error => {
            dispatch(fetchGalleryFail(error));
        })
    }
};

export const fetchGalleryStart = (token) => {
    return {
        type: actionTypes.FETCH_GALLERY_START
    }
};

export const fetchGallerySuccess = (galleryList) => {
    return {
        type: actionTypes.FETCH_GALLERY_SUCCESS, 
        gallery: galleryList
    }
};

export const fetchGalleryFail = (error) => {
    return {
        type: actionTypes.FETCH_GALLERY_FAIL,
        error: error
    }
};


