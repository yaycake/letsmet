import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
import ArtControls from '../ArtControls/ArtControls';
import { Redirect, withRouter } from 'react-router-dom';
import NextButton from '../../components/NextButton/NextButton';
import { removeGallery } from '../../store/actions/gallery';

const BrowseArt = props => {
    
    const title = useSelector( state => state.artwork.artwork.title);
    const artistDisplayName = useSelector( state => state.artwork.artwork.artistDisplayName);
    const medium = useSelector(state => state.artwork.artwork.medium);
    const curObjectId = useSelector(state => state.artwork.artwork.objectId);
    const primaryImage = useSelector(state => state.artwork.artwork.primaryImageSmall);
    const primaryImageSmall = useSelector(state => state.artwork.artwork.primaryImageSmall);
    // const error = useSelector(state => state.artwork.error)

    const userId = useSelector( state => state.auth.userId)
   
    const userGallery = useSelector(state => state.myGallery.gallery)
    const token = useSelector(state => state.auth.token)

    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())},
        [dispatch])

    const onSetGallery = useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[dispatch])

    

    useEffect(() => {
        onSetGallery(token, userId)
    }, [onSetGallery, token, userId])

    useEffect ( () => {
        onFetchArt();
    }, [onFetchArt])


    const [curBookmarkedStyle, setBookmarkedStyle] = useState(
        null
    )

   
    const bookmarkCheck = () => {
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === curObjectId)
    }

    // if (bookmarkCheck()) {
    //     console.log(`bookmarkCheck: true!!`)
    //     setBookmarkedStyle(true)
    // } 


    const bookmarkStyleToggle = () => {
        setBookmarkedStyle(!curBookmarkedStyle)
    }
    

    const addBookmarkHandler = () => {
        console.log('Gallery.js: bookmarkArtHandler')
        if (!token) {
            props.history.push("/auth")
        } else {
            //Update userGallery
            onSetGallery(token,userId)
            if (!bookmarkCheck()){
                console.log(`Not in Gallery!!`)
                addGallery()
                bookmarkStyleToggle()
            } else {
                alert('NOPE, DUPLICATE!')
            }
        }
    }

    const removeBookmarkHandler = () => {
        console.log('Gallery.js: remove bookmark handler')
        removeGallery()
        bookmarkStyleToggle()
        alert("art removed!")
    }

  
    const addGallery = () => {
        console.log('Gallery.js: addGallery')
        dispatch(actions.addGallery(
            {
                title: title, 
                artistDisplayName: artistDisplayName, 
                medium: medium, 
                objectId: curObjectId, 
                primaryImage: primaryImage, 
                primaryImageSmall: primaryImageSmall
            }, token
        ))

        console.log('Gallery.js: ADDED TO GALLERY')
        // Update Gallery again
        onSetGallery(token,userId)
    }

    

    return (
        <div className = { styles.BrowseArt }>
          
            <Artwork 
                image = {primaryImageSmall}
                altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} /> 
             
            <ArtControls
                isAuth = { token !== null }
                fave = { addGallery }

                bookmark = { addBookmarkHandler }
                checkBookmark = { bookmarkCheck }
                removeBookmark = { removeBookmarkHandler }
                bookmarkedStyle = { curBookmarkedStyle }
                title={title}
                medium = {medium}
                artistDisplayName = {artistDisplayName}/>

            <NextButton clicked = { onFetchArt } />
        </div>
    )
}

export default BrowseArt;