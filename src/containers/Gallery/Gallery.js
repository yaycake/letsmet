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
    const token = useSelector( state => state.auth.token)
    const lastArtwork = useSelector(state => state.myGallery.lastArtwork)

    const error = useSelector(state => state.myGallery.error)
    const loading = useSelector(state => state.myGallery.loading)
  
    const userId = useSelector( state => state.auth.userId)

    //Redux Actions
    const dispatch = useDispatch();

    const onSetGallery =  useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[token, userId])

    const selectArtPreviewHandler = (  
            title,
            artistDisplayName, 
            medium,  
            objectId,  
            primaryImage,  
            primaryImageSmall, 
            artId
    ) => {

        console.log(`In selectArtPreviewHandler`)

        setCurArtwork({
            title: title,
            artistDisplayName: artistDisplayName, 
            medium: medium,  
            objectId: artId,  
            primaryImage: primaryImage,  
            primaryImageSmall: primaryImageSmall
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


    const previewLatestArtwork = useCallback(() => {
            setCurArtwork({
                ...lastArtwork
            })
    }, [lastArtwork])


    useEffect(() => {
        onSetGallery(token, userId);
    }, [onSetGallery, token, userId])

    useEffect (() => {
        previewLatestArtwork()
    }, [previewLatestArtwork, lastArtwork])

    const galleryStrip = (
        userGallery.map(art => 
            <PreviewTile
                clicked = { () => selectArtPreviewHandler(art.title,
                    art.artistDisplayName,art.artistDisplayName, 
                    art.medium,  
                    art.objectId,  
                    art.primaryImage,  
                    art.primaryImageSmall, 
                    art.objectId
                ) }
                key = { art.objectId }
                altText = { art.title }
                image = {art.primaryImageSmall}
                id = { art.objectId }
                // clicked = { selectArtPreviewHandler }
            />)
    )


    return (
        <div>
            <div className = { styles.GalleryFrame }>
                <div className = {styles.GalleryStrip}>
                    {galleryStrip}
                </div>
            </div>

            <div className = { styles.Gallery }>
                <Artwork 
                    image = {curArtwork.primaryImageSmall}
                    altText = {`Title: ${ curArtwork.title } by ${ curArtwork.artistDisplayName}. Medium: ${ curArtwork.medium }`} />  
                <ArtControls
                    title = { curArtwork.title }
                    medium = { curArtwork.medium }
                    artistDisplayName = { curArtwork.artistDisplayName }
                />
                {/* <NextButton clicked = { onFetchArt } /> */}
            </div>
        </div>
    )
}

export default Gallery;