import React, { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import PreviewTile from '../../components/PreviewTile/PreviewTile';
import Artwork from '../../components/Artwork/Artwork'
import InfoButton from '../../components/Artwork/InfoButton/InfoButton';
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'
import LikeButton from '../../components/Artwork/LikeButton/LikeButton'
import Error from '../../components/UI/Error/Error';


const Gallery = (props) => {
    //Redux Props
    const userGallery = useSelector(state => state.myGallery.gallery)
    const token = useSelector( state => state.auth.token)
    
    const error = useSelector(state => state.myGallery.error)
    const loading = useSelector(state => state.myGallery.loading)
  
    const userId = useSelector( state => state.auth.userId)

    //Redux Actions
    const dispatch = useDispatch();

    const onSetGallery =  useCallback(()  => dispatch(actions.fetchGallery(token,userId)),[dispatch, token, userId])

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
        // onSetGallery(token, userId);

        let nextArtwork = {...userGallery[newIndex]}

        if (newIndex < 0){
            nextArtwork = { ...userGallery[1]}
        }

        setCurArtwork({
            title: nextArtwork.title,
            artistDisplayName: nextArtwork.artistDisplayName,
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

    const addGallery = () => {
    }

    const removeGallery = ( objectDataId ) => {
        console.log(`Gallery.js: addGallery: ${objectDataId}`)
        setBookmarked({
            ...showBookmarked, 
            style: "outline"
        })

        dispatch(actions.removeGallery(token, userId,
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
        // onSetGallery(token, userId)
    }

    const galleryStrip = (
        userGallery.map((art, index ) => 
            <PreviewTile
                activeTile = { curArtwork.objectId === art.objectId ? true : false }
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

    // If there is an error 
    let errorMessage = null;

    if (error) {
        errorMessage = <Error message={error.message}></Error>
    }

    return (
        <div>

            <div className = { styles.GalleryFrame }>
                <div className = {styles.GalleryStrip}>
                    {galleryStrip}
                </div>
            </div>

            <div className = { styles.Gallery }>
                
                { error && errorMessage }

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
                            bookmarkStatus = {true}
                            bookmarkRemove = {removeGallery}
                            bookmarkAdd = { addGallery }
                            objectDataId = { curArtwork.dataId }
                        />
                    </div>
                </div>               
            </div>
        </div>
    )
}

export default Gallery;