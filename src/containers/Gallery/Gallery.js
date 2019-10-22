import React, { useState, useEffect } from 'react';
import styles from './Gallery.module.css'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

const Gallery = (props) => {

    const [curArtwork, setCurArtwork] = useState({
        title: null, 
        artistDisplayName: null, 
        medium: null, 
        objectId: null, 
        primaryImage: null, 
        primaryImageSmall: null,
    })

    //Redux Props
    const userGallery = useSelector(state => state.myGallery.gallery)
    const error = useSelector(state => state.myGallery.error)
    const loading = useSelector(state => state.myGallery.loading)

    //Redux Actions
    const dispatch = useDispatch();

    const setGallery = ( dispatch => 
        dispatch(actions.fetchGallery()))

    const removeArt = ( dispatch => 
        dispatch(actions.removeGallery(curArtwork)))

    useEffect(() => {
        setGallery()
    }, [])


    return (
        <div className = { styles.Gallery }>
            
            This the gallery
            This the gallery
            This the gallery
            This the gallery
            This the gallery
            This the gallery
        </div>
    )
}

export default Gallery;