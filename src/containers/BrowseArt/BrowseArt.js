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

    const dispatch = useDispatch();

    const onFetchArt = useCallback(
        () => {dispatch(actions.startFetchArt())},
        [dispatch])

    const onSetGallery = useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[dispatch]);

    // const onCheckGallery = useCallback((userGallery, curObjectId) => {
    //     if ( userGallery.some((art) => art.objectId === curObjectId)) {
    //         return true
    //     } else {
    //         return false
    //     }
        
    // })
   

    useEffect(() => {
        onSetGallery(token, userId)
    }, [onSetGallery, token, userId])

    useEffect ( () => {
        onFetchArt();
    }, [onFetchArt])

   
    const bookmarkCheck = () => {
        console.log(`IN BOOKMARKCHECK`)
        console.log(userGallery.some((art) => art.objectId === curObjectId))
        //returns truthy/falsey
        return userGallery.some((art) => art.objectId === curObjectId)
    }
    

    const addBookmarkHandler = () => {
        console.log('Gallery.js: bookmarkArtHandler')
        if (!token) {
            props.history.push("/auth")
        } else {
            //Update userGallery
            onSetGallery(token,userId)
            if (!bookmarkCheck()){
                addGallery()
                // bookmarkStyleToggle()
            } else {
                alert('NOPE, DUPLICATE!')
            }
        }
    }

    const removeBookmarkHandler = () => {
        console.log('Gallery.js: remove bookmark handler')
        removeGallery()
        // bookmarkStyleToggle()
        alert("art removed!")
    }
  
    const addGallery = () => {
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
                //bookmark functions & style
                fave = { addGallery }
                addBookmark = { addBookmarkHandler }
                checkBookmark = {bookmarkCheck}
                removeBookmark = { removeBookmarkHandler }
                //art info 
                title={title}
                medium = {medium}
                artistDisplayName = {artistDisplayName}
                
                userGallery = { userGallery }
                curObjectId = { curObjectId }
                />

            <NextButton clicked = { onFetchArt } />
        </div>
    )
}

export default BrowseArt;