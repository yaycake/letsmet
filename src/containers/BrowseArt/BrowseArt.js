import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
// import ArtControls from '../ArtControls/ArtControls';
import NextButton from '../../components/NextButton/NextButton';
import ArtInfo from '../../components/Artwork/ArtInfo/ArtInfo'; 
import LikeButton from '../../components/Artwork/LikeButton/LikeButton';
import InfoButton from '../../components/Artwork/InfoButton/InfoButton'; 

const BrowseArt = props => {
    //redux props
    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const curObjectId = useSelector(state => state.artwork.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);

    let dataId = useSelector(state => state.myGallery.dataId)

    const error = useSelector(state => state.artwork.error)

    const userGallery = useSelector(state => state.myGallery.gallery);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector( state => state.auth.userId);

    const [showArtInfo, setShowArtInfo] = useState(false);

    const showInfoToggle = () => {
        setShowArtInfo(!showArtInfo)
    }

    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())}, [dispatch])
    
    // useEffect (() => {
    //     onFetchArt();
    // }, [])

    const onSetGallery = useCallback((token, userId) => dispatch(actions.fetchGallery(token, userId)),[dispatch]);

    useEffect(() => {
        if (token){
            onSetGallery(token, userId);
        }
    }, [onSetGallery, token, userId, dataId])

    //set Bookmark settings
    const [isBookmarked, setBookmarked] = useState(null)

    const removeGallery = (objectDataId) => {
        dispatch(actions.removeGallery(token, userId, 
            {
                title: title, 
                artistDisplayName: artistDisplayName, 
                medium: medium, 
                objectId: curObjectId, 
                primaryImage: primaryImage, 
                primaryImageSmall: primaryImageSmall, 
                dataId: dataId
            }
        ))
        setBookmarked(false)
        onSetGallery(token, userId) 
    };

    const addGallery = (objectDataId) => {
        if (!token) {
            props.history.push("/auth")
        } else {
            dispatch(actions.addGallery(token, userId, 
                {   title: title, 
                    artistDisplayName: artistDisplayName,
                    medium: medium, 
                    objectId: curObjectId, 
                    primaryImage: primaryImage, 
                    primaryImageSmall: primaryImageSmall
                }
            ))
            setBookmarked(true)  
        }
    }

    const bookmarkCheck = useCallback(() => {
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === curObjectId)
    }, [curObjectId, userGallery])

     useEffect(() => {
        if (bookmarkCheck(curObjectId) === true ){
            setBookmarked(true) 
        } else {
            setBookmarked(false)
        }
    }, [curObjectId])

    return (
        <div className = { styles.BrowseArt }>
            <Artwork 
                image = {primaryImageSmall}
                altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} 
            /> 
            <div className = {styles.ArtControls}>
                <div className = {styles.infoBox}>
                    <InfoButton
                        showinfo = {showArtInfo}
                        infoClicked = { showInfoToggle }
                    />
                    <ArtInfo
                        className = { styles.artInfo}
                        title = {title}
                        medium = { medium }
                        artistDisplayName = {props.artistDisplayName}
                        showInfo = {showArtInfo}
                    />
                </div>
                <LikeButton
                    bookmarkAdd = { addGallery }
                    bookmarkRemove = { removeGallery }
                    bookmarkStatus= {isBookmarked}
                    objectDataId = { dataId }
                />
            </div>
            <NextButton clicked = { onFetchArt } />
        </div>
    )
}

export default BrowseArt;