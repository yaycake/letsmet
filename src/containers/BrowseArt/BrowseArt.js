import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
import ArtControls from '../ArtControls/ArtControls';
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
    
    useEffect (() => {
        onFetchArt();
    }, [onFetchArt])

    const onSetGallery = useCallback((token, userId) => dispatch(actions.fetchGallery(token,userId)),[dispatch]);

    useEffect(() => {
        if (token){
            onSetGallery(token, userId);
        }
    }, [onSetGallery, token, userId])


    const [showBookmarked, setBookmarked] = useState({
        isBookmarked: null, 
        action: null
     })


    const addGallery = () => {
        console.log(`in browseArt AddGallery`)
        console.log(`in addGallery: title ${title}`)
        if (!token) {
            props.history.push("/auth")
        } else {
            dispatch(actions.addGallery(token, 
                {   title: title, 
                    artistDisplayName: artistDisplayName, 
                    medium: medium, 
                    objectId: curObjectId, 
                    primaryImage: primaryImage, 
                    primaryImageSmall: primaryImageSmall
                }
            ))
        }
        
    }


    const removeGallery = () => {
        console.log(`in browseArt RemoveGallery`)
        
        dispatch(actions.removeGallery(token, 
            {
                title: title, 
                artistDisplayName: artistDisplayName, 
                medium: medium, 
                objectId: curObjectId, 
                primaryImage: primaryImage, 
                primaryImageSmall: primaryImageSmall
            }
        ))
    }


    const bookmarkCheck = (ObjectId) => {
        console.log(`in bookmarkCheck: title: ${ title }`)
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === ObjectId)
    }

    const initBookmark = () => {
        console.log(`in initBookmark`)
        if (bookmarkCheck(curObjectId) === true ){
            setBookmarked({
                isBookmarked: true, 
                action: removeGallery
            }) 
        } else {
            setBookmarked({
               isBookmarked: false, 
               action: addGallery
            })
          
        }
    }

    useEffect(() => {
        initBookmark()
    }, [curObjectId])

    return (
        <div className = { styles.BrowseArt }>
          
            <Artwork 
                image = {primaryImageSmall}
                altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} /> 
             
            {/* <ArtControls
                isAuth = { token !== null }
                //bookmark functions & style
                clickBookmark = {clickBookmarkHandler}
                bookmarkStatus = {showBookmarked.isBookmarked}
                bookmarkAction = { showBookmarked.action }
                //art info 
                title={title}
                medium = {medium}
                artistDisplayName = {artistDisplayName}
                userGallery = { userGallery }
                curObjectId = { curObjectId }
                /> */}

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
                    bookmarkStatus= {showBookmarked.isBookmarked}
                    bookmarkAction = {showBookmarked.action}
                    click = {props.clickBookmark}
                />
            </div>

            <NextButton clicked = { onFetchArt } />
      
            { setBookmarked === true ? 
                <p>ONCHECK GALLERY TRUE</p>
                : <p>ONCHECK GALLERY FALSE</p>
            } 
           
        </div>
    )
}

export default BrowseArt;