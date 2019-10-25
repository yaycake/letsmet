import React, { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import PreviewTile from '../../components/PreviewTile/PreviewTile';
import Artwork from '../../components/Artwork/Artwork'
import ArtControls from '../ArtControls/ArtControls'

const Gallery = (props) => {
    //Redux Props
    const userGallery = useSelector(state => state.myGallery.gallery)
    const lastArtwork = useSelector(state => state.myGallery.lastArtwork)

    const error = useSelector(state => state.myGallery.error)
    const loading = useSelector(state => state.myGallery.loading)
    const token = useSelector( state => state.auth.token)
    const userId = useSelector( state => state.auth.userId)

    //Redux Actions
    const dispatch = useDispatch();

    const onSetGallery =  useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[token, userId])

    const selectArtPreviewHandler = ( artId ) => {
        const selectedArt = userGallery.find((art) => art.id === artId)

        setCurArtwork({
            title: selectedArt.title,
            artistDisplayName: selectedArt.artistDisplayName, 
            medium: selectedArt.medium,  
            objectId: selectedArt.objectId,  
            primaryImage: selectedArt.primaryImage,  
            primaryImageSmall: selectedArt.primaryImageSmall
        })
    }

    const [curArtwork, setCurArtwork] = useState({
        title: lastArtwork.title,
        artistDisplayName: null, 
        medium: null,  
        objectId: null,  
        primaryImage: lastArtwork.primaryImage,  
        primaryImageSmall: lastArtwork.primaryImageSmall
    })


    const previewCurrentArtwork = useCallback(() => {
            setCurArtwork({
                ...lastArtwork
            })
    }, [lastArtwork])


    useEffect(() => {
        onSetGallery(token, userId);
    }, [onSetGallery, token, userId])

    useEffect (() => {
        previewCurrentArtwork()
    }, [previewCurrentArtwork, lastArtwork])

    const galleryStrip = (
        userGallery.map(art => 
            <PreviewTile
                key = { art.objectId }
                altText = { art.title }
                image = {art.primaryImageSmall}
                id = { art.id }
                // clicked = { selectArtPreviewHandler }
            />)
    )


    return (
        <div className = { styles.Gallery }>
            <div className = { styles.GalleryFrame }>
                <div className = {styles.GalleryStrip}>
                    {galleryStrip}
                </div>
            </div>
          
            <Artwork 
                image = {curArtwork.primaryImageSmall}
                altText = {`Title: ${ curArtwork.title } by ${ curArtwork.artistDisplayName}. Medium: ${ curArtwork.medium }`} />  
            <ArtControls
                // fave = {  }
                title = { curArtwork.title }
                medium = { curArtwork.medium }
                artistDisplayName = { curArtwork.artistDisplayName }

                ></ArtControls>
        </div>
    )
}

export default Gallery;