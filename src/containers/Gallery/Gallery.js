import React, { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import PreviewTile from '../../components/PreviewTile/PreviewTile';

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

    const token = useSelector( state => state.auth.token)
    const userId = useSelector( state => state.auth.userId)

    console.log(`in GALLERYJS: userID: ${userId}`)

    //Redux Actions
    const dispatch = useDispatch();

    const onSetGallery =  useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[token, userId])

    // const removeArt = ( dispatch => 
    //     dispatch(actions.removeGallery(curArtwork)))

    useEffect(() => {
        onSetGallery(token, userId)
    }, [onSetGallery, token, userId])

    const galleryStrip = (
        userGallery.map(art => 
            <PreviewTile
                key = { art.id }
                image = {art.primaryImageSmall}
            />)
    )


    return (
        <div className = { styles.Gallery }>

            {galleryStrip}
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