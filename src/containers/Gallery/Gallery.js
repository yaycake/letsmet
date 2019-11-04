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
    
    // const error = useSelector(state => state.myGallery.error)
    // const loading = useSelector(state => state.myGallery.loading)
  
    const userId = useSelector( state => state.auth.userId)

    const lastArtwork = {...userGallery[userGallery.length - 1]}

    // Set Preview To Latest Artwork
    const [curArtwork, setCurArtwork] = useState({
        title: lastArtwork.title,
        artistDisplayName: lastArtwork.artistDisplayName,
        medium: lastArtwork.medium,  
        objectId: lastArtwork.objectId,  
        primaryImage: lastArtwork.primaryImage,  
        primaryImageSmall: lastArtwork.primaryImageSmall
    })

    //Redux Actions
    const dispatch = useDispatch();

    const onSetGallery =  useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[dispatch])

    useEffect(() => {
        onSetGallery(token, userId)
    }, [onSetGallery, token, userId])

    const bookmarkCheck = () => {
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === curArtwork.objectId)
    }

    const onCheckGallery = ()=> {
        if ( userGallery.some((art) => art.objectId === curArtwork.objectId)) {
            console.log(`in onCheckGallery: True`)
            return true
        } else {
            console.log(`in onCheckGallery: False`)
            return false
        }
    }

    const selectArtPreviewHandler = (  
            title,
            artistDisplayName, 
            medium,  
            objectId,  
            primaryImage,  
            primaryImageSmall
    ) => {
        console.log(`In selectArtPreviewHandler`)
        setCurArtwork({
            title: title,
            artistDisplayName: artistDisplayName, 
            medium: medium,  
            objectId: objectId,  
            primaryImage: primaryImage,  
            primaryImageSmall: primaryImageSmall
        })
  
    }

    const galleryStrip = (
        userGallery.map(art => 
            <PreviewTile
                clicked = { () => selectArtPreviewHandler(art.title,
                    art.artistDisplayName, 
                    art.medium,  
                    art.objectId,  
                    art.primaryImage,  
                    art.primaryImageSmall, 
                ) }
                key = { art.objectId }
                altText = { art.title }
                image = {art.primaryImageSmall}
                id = { art.objectId }
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
                    bookmarkStatus ={ bookmarkCheck()}
                    artistDisplayName = { curArtwork.artistDisplayName }
                />
                {/* <NextButton clicked = { onFetchArt } /> */}

                {/* { onCheckGallery() === true ? <p>ONCHECK GALLERY TRUE</p> : <p>ONCHECK GALLERY FALSE</p>} */}
            </div>
        </div>
    )
}

export default Gallery;