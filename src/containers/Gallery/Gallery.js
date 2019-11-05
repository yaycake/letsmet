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

    // Set Preview To Latest Artwork
    const lastArtwork = {...userGallery[userGallery.length - 1]}

    const [curArtwork, setCurArtwork] = useState({
        title: lastArtwork.title,
        artistDisplayName: lastArtwork.artistDisplayName,
        medium: lastArtwork.medium,  
        objectId: lastArtwork.objectId,  
        primaryImage: lastArtwork.primaryImage,  
        primaryImageSmall: lastArtwork.primaryImageSmall, 
        dataId: lastArtwork.dataId
    })

    const [showBookmarked, setBookmarked] = useState(true)

    const [showArtInfo, setShowArtInfo] = useState(false);

    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }

    //Redux Actions
    const dispatch = useDispatch();

    const onSetGallery =  useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[dispatch])

    useEffect(() => {
        onSetGallery(token, userId)
    }, [onSetGallery, token, userId])

    const bookmarkCheck = (ObjectId) => {
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === ObjectId)
    }

    const selectArtPreviewHandler = (  
            title,
            artistDisplayName, 
            medium,  
            objectId,  
            primaryImage,  
            primaryImageSmall, 
            dataId
    ) => {
        console.log(`In selectArtPreviewHandler`)
        setCurArtwork({
            title: title,
            artistDisplayName: artistDisplayName, 
            medium: medium,  
            objectId: objectId,  
            primaryImage: primaryImage,  
            primaryImageSmall: primaryImageSmall, 
            dataId: dataId
        })
        console.log(`curdataID: ${curArtwork.dataId}`)
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
                    art.dataId 
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