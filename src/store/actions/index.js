export {
    startFetchArt, 
    fetchArt,
    fetchArtSuccess,
    fetchArtFail, 

    setPreviousArtwork, 
    startFetchPreviousArt, 
    fetchPreviousArt, 
    // fetchPreviousArtSuccess,
    fetchPreviousArtFailed
} from './artwork';

export {
    startInitObjects, 
    initArtObjects, 
    initObjectsFailed,
    initObjectsSuccess,
} from './artObjects';

export {
    addGallery, 
    addGalleryFailed, 
    addGallerySuccess,

    removeGallery,
    removeGalleryFailed,
    removeGallerySuccess,
    
    fetchGallery,
    fetchGalleryFailed, 
    fetchGallerySuccess
} from './gallery';

export {
    auth, 
    authSuccess, 
    authFail,
    logout, 
    saveUsername, 
    saveUsernameSuccess,
    saveUsernameFailed
} from './auth';
