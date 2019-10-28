import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Artwork from '../../components/Artwork/Artwork';
import * as actions from '../../store/actions/index'
import styles from './BrowseArt.module.css';
import ArtControls from '../ArtControls/ArtControls';
import { Redirect, withRouter } from 'react-router-dom';
import NextButton from '../../components/NextButton/NextButton';

const BrowseArt = props => {

    // const [curArtwork, setCurArtwork] = setState

    // const [curArtwork, setCurArtwork] = setState({
        
    // })
    
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

    const onSetGallery =  useCallback((token, userId)  => dispatch(actions.fetchGallery(token,userId)),[token, userId])

    useEffect(() => {
        onSetGallery(token, userId);
    }, [onSetGallery, token, userGallery])

    // const checkIfLiked = () => {
    //     const matchedArt = userGallery.find(({art}) => art.objectId === objectId)

    //     console.log(`matchedArt: ${matchedArt}`)

        
    //     if ( userGallery.find({art} => art.objectId === objectId)){
    //         console.log('art is already in gallery!')
    //         return true
    //     } else {
    //         console.log('New Art!')
    //         return false
    //     }
    // }

    const bookmarkArtHandler = () => {
        console.log('Gallery.js: bookmarkArtHandler')
        if (!token) {
            props.history.push("/auth")
        } else {
            if (!checkIfBookmarked()){
                addGallery()
            } else {
                alert('NOPE, DUPLICATE!')
            }
        }
    }
    const checkTest = (galleryArray, objectId) => {
        return galleryArray.some((art) => art.objectId === objectId)
    }
    

    const checkIfBookmarked = () => {
        console.log(`Gallery.js: check if Bookmarked`)
        return checkTest(userGallery, curObjectId)
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
    }

    const toggleLikeButton = () => {
        
    }

    useEffect ( () => {
        onFetchArt();
    }, [onFetchArt])
   
    useEffect ( () => {

    })

    let authRedirect = null;
    
    if (token) {
        authRedirect = <Redirect to="/auth"/>
    }

    return (
        <div className = { styles.BrowseArt }>
          
            <Artwork 
                image = {primaryImageSmall}
                altText = {`Title: ${ title } by ${ artistDisplayName}. Medium: ${ medium }`} /> 
             
            <ArtControls
                isAuth = { token !== null }
                fave = { addGallery }
                bookmark = {bookmarkArtHandler}
                title={title}
                medium = {medium}
                artistDisplayName = {artistDisplayName}/>

            <NextButton clicked = { onFetchArt } />
        </div>
    )
}

export default BrowseArt;