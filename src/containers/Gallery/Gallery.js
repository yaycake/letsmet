import React, { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import PreviewTile from '../../components/PreviewTile/PreviewTile';
import Artwork from '../../components/Artwork/Artwork'
import InfoButton from '../../components/Artwork/InfoButton/InfoButton';
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'
import LikeButton from '../../components/Artwork/LikeButton/LikeButton'


const Gallery = (props) => {
    //Redux Props
    const userGallery = useSelector(state => state.myGallery.gallery)
    const token = useSelector( state => state.auth.token)
    
    const error = useSelector(state => state.myGallery.error)
    const loading = useSelector(state => state.myGallery.loading)
  
    const userId = useSelector( state => state.auth.userId)

    //Redux Actions
    const dispatch = useDispatch();

    const onSetGallery =  useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[dispatch])

    useEffect(() => {
        onSetGallery(token, userId)
    }, [onSetGallery, token, userId])

    // Set Preview To Latest Artwork
    const lastArtwork = {...userGallery[userGallery.length - 1]}

    const [curArtwork, setCurArtwork] = useState({
        title: lastArtwork.title,
        artistDisplayName: lastArtwork.artistDisplayName,
        medium: lastArtwork.medium,  
        objectId: lastArtwork.objectId,  
        primaryImage: lastArtwork.primaryImage,  
        primaryImageSmall: lastArtwork.primaryImageSmall, 
        dataId: lastArtwork.dataId,
        index: userGallery.length - 1
      
    })


    const resetArtwork = (newIndex) => {
        onSetGallery(token, userId);

        console.log(`in setLastArtwork`)
        console.log(`Length of array? ${userGallery.length}`)
        const nextArtwork = {...userGallery[newIndex]}

        console.log(`setLastArt: lastArtwork: ${nextArtwork.title}`)

        setCurArtwork({
            title: nextArtwork.title,
            artistDisplayName: lastArtwork.artistDisplayName,
            medium: nextArtwork.medium,  
            objectId: nextArtwork.objectId,  
            primaryImage: nextArtwork.primaryImage,  
            primaryImageSmall: nextArtwork.primaryImageSmall,
            dataId: nextArtwork.dataId
        })
    }

    const [showBookmarked, setBookmarked] = useState(true)

    const [showArtInfo, setShowArtInfo] = useState(false);

    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }

    const selectArtPreviewHandler = (  
            title,
            artistDisplayName, 
            medium,  
            objectId,  
            primaryImage,  
            primaryImageSmall, 
            dataId, 
            index
    ) => {
        console.log(`In selectArtPreviewHandler`)

        setCurArtwork({
            title: title,
            artistDisplayName: artistDisplayName, 
            medium: medium,  
            objectId: objectId,  
            primaryImage: primaryImage,  
            primaryImageSmall: primaryImageSmall, 
            dataId: dataId, 
            index: index
        })
    }   

    const removeGallery = () => {
        console.log(`in RemoveGallery`)
        setBookmarked({
            ...showBookmarked, 
            style: "outline"
        })
        console.log(`curArtwork.curObjectId: ${curArtwork.objectId}`)

        dispatch(actions.removeGallery(token, 
            {
                title: curArtwork.title, 
                artistDisplayName: curArtwork.artistDisplayName, 
                medium: curArtwork.medium, 
                objectId: curArtwork.objectId, 
                primaryImage: curArtwork.primaryImage, 
                primaryImageSmall: curArtwork.primaryImageSmall, 
                dataId: curArtwork.dataId
            }
        ))
        resetArtwork(curArtwork.index -1)
    }

    const galleryStrip = (
        userGallery.map((art, index ) => 
            <PreviewTile
                clicked = { () => selectArtPreviewHandler(       art.title,
                    art.artistDisplayName, 
                    art.medium,  
                    art.objectId,  
                    art.primaryImage,  
                    art.primaryImageSmall,
                    art.dataId, 
                    index
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
                    altText = {`Title: ${ curArtwork.title } by ${ curArtwork.artistDisplayName}.`} />  

                <div className = {styles.ArtControls}>
                    <div className = {styles.infoBox}>
                        <InfoButton
                            showinfo = {showArtInfo}
                            infoClicked = { showInfoToggle }
                        />
                        <ArtInfo
                            className = { styles.artInfo}
                            title = {curArtwork.title}
                            medium = {curArtwork.medium}
                            artistDisplayName = {curArtwork.artistDisplayName}
                            showInfo = {showArtInfo}
                        />  
                        <LikeButton
                            bookmarkStatus = {showBookmarked}
                            bookmarkAction = {removeGallery}
                            bookmarkStyle = {"solid"}
                        />
                        
                    </div>
                </div>               
            </div>
        </div>
    )
}

export default Gallery;